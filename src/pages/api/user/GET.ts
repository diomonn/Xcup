import { LinkCard, Prisma, PrismaClient } from '@prisma/client'
import {NextApiRequest,NextApiResponse}  from 'next'
const prisma = new PrismaClient()
async function main(name:string,email:string,image:string) {
  await prisma.user.create({
    data: {
     name,
     email,
     image,
    },
  })
  const allUsers = await prisma.user.findMany()
  console.dir(allUsers, { depth: null })
}
export default async function A(req:NextApiRequest,res:NextApiResponse){
  const {email,name,image}=JSON.parse(req.body)       
 await  main(name,email,image)
 .then(async () => {
  console.log("ok");
   await prisma.$disconnect()
 })
 .catch(async (e) => {
   console.error(e)
   await prisma.$disconnect()
   process.exit(1)
 })


  
 res.status(200).json('OK')
}

