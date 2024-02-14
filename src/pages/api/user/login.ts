import { LinkCard, Prisma, PrismaClient } from '@prisma/client'
import {NextApiRequest,NextApiResponse}  from 'next'
// import Email from 'next-auth/providers/email'
const prisma = new PrismaClient()
async function main(name:string,email:string,image:string,password:string) {
  return await prisma.user.findUnique({
    where: {
    //  name,
     email,
    //  image,
     password,
    },
  })
}
export default async function A(req:NextApiRequest,res:NextApiResponse){
  // console.log(req.body);
  // const {ID}=

  const {email,password} =req.body
const user=await prisma.user.findUnique({
  where: {
  //  name,
   email,
  //  image,
   password,
  },
})
if (user?.id) {
  res.status(200).json(user)

}else{
  res.status(404).json("ok")
}
  
}

