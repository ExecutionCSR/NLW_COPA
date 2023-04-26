import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
    fastify.get('/me',{
        onRequest:[authenticate]
    },
    async(request)=>{
        return {user: request.user}
    })

    fastify.post('/users',async(request)=>{
        const createuserBody = z.object({
            access_token:z.string(),
        })

        const {access_token} =createuserBody.parse(request.body)

        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo',{
            method:"GET",
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        }),
        userData = await userResponse.json()

        const userInfoShcema = z.object({
            id:z.string(),
            email: z.string().email(),
            name:z.string(),
            picture:z.string().url()
        }),
        userInfo = userInfoShcema.parse(userData);

        let user = await prisma.user.findUnique({
            where:{
                googleID:userInfo.id
            }
        })

        if(!user){
            user = await prisma.user.create({
                data:{
                    googleID:userInfo.id,
                    name:userInfo.name,
                    email:userInfo.email,
                    avatarUrl:userInfo.picture
                }
            })
        }

        const token = fastify.jwt.sign({
            name:user.name,
            avatarUrl:user.avatarUrl
        },{
            sub:user.id,
            expiresIn:"8 days"
        })

        return {token}
    })
}