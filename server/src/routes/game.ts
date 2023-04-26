import { FastifyInstance } from "fastify";
import { preprocess, z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export  async function gameRoutes(fastify : FastifyInstance){
    fastify.get('/pools/:id/games',{
        onRequest:[authenticate]
    },async (request) => {
        const getPoolParams =z.object({
            id:z.string(),
        })

        const {id} = getPoolParams.parse(request.params)

        const games = await prisma.game.findMany({
            orderBy:{
                date:'desc',
            },
            include:{
                guesses:{
                    where:{
                        participant:{
                            userId:request.user.sub,
                            poolId:id,
                        }
                    }
                }
            }
        })

        return {
            games:games.map(game=>{
                return {
                    ...game,
                    guess:game.guesses.length > 0 && game.guesses[0],
                    guesses:undefined
                }
            })
        }
    })
    fastify.post('/pools/:poolId/games/:gameId/guesses',{
        onRequest:[authenticate]
    },async (request,reply) => {
        const createGuessParams = z.object({
            poolId:z.string(),
            gameId:z.string(),
        }),
        createGuessBody = z.object({
            firtsTeamPoint:z.number(),
            secondTeamPoint:z.number(),
        })


        const {poolId,gameId} = createGuessParams.parse(request.params)
        const {firtsTeamPoint,secondTeamPoint} = createGuessBody.parse(request.body)

        const participant = await prisma.participant.findUnique({
            where:{
                userId_poolId:{
                    poolId,
                    userId:request.user.sub
                }
            }
        })

        if(!participant){
            return reply.status(400).send({
                message: "Você não tem permissão para criar um palpite neste bolão"
            })
        }

        const guess = await prisma.guess.findUnique({
            where:{
                participantId_gameId:{
                    participantId:participant.id,
                    gameId:gameId
                }
            }
        })

        if(guess){
            return reply.status(400).send({
                message:"Você já fez um palpite com jogo nesse bolão "
            })
        }

        const game = await prisma.game.findUnique({
            where:{
                id:gameId,
            }
        })

        if(!game){
            return reply.status(400).send({
                message:"Jogo não achado"
            })
        }

        if(game.date < new Date()){
            return reply.status(400).send({
                message:"Esse jogo já aconteceu ,você nao pode fazer um palpite"
            })
        }

        await prisma.guess.create({
            data:{
                gameId,
                participantId:participant.id,
                firtsTeamPoint,
                secondTeamPoint
            }
        })

        return reply.status(400).send({
            message:'Palpite criado'
        })
    })
}