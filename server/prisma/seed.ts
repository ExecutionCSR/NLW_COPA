import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.create({
        data:{
            name: "Ciclano",
            email:"ciclano@email.com",
            avatarUrl:"https://github.com/ExecutionCSR.png"
        }
    })
    const pool = await prisma.pool.create({
        data:{
            title:  "Bolão da Fé",
            code:"BOLAFE",
            ownerId:user.id,

            participants :{
                create:{
                    userId:user.id,
                }
            }
        }

        
    })

    await prisma.game.create({
        data:{
            date:"2022-11-06T16:00:00.000Z",
            firstTeamCountryCode:"JP",
            secondTeamCountryCode:"BR"
        }
    })
    await prisma.game.create({
        data:{
            date:"2022-11-08T10:00:00.000Z",
            firstTeamCountryCode:"US",
            secondTeamCountryCode:"DE",

            guesses:{
                create:{
                    firtsTeamPoint:1,
                    secondTeamPoint:5,
                    participant:{
                        connect:{
                            userId_poolId:{
                                userId:user.id,
                                poolId:pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}
main()