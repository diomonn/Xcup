// import second from 'next/'
import { PrismaClient } from '@prisma/client'
import {NextApiRequest,NextApiResponse}  from 'next'
import authID from '@/hooks/auth'
const prisma=new PrismaClient()
async function GET(req:NextApiRequest,res:NextApiResponse) {
  const [Session]=await authID(req,res)
 if (Session) {
 const name=await prisma.linkCardGather.findMany({
  where:{
    OR:[
      {
       userId:Session.user.id
      },
      {
       userTeaam:{
         some:{
          userId:Session.user.id
         }
       }
      }
    ]
  },
  include:{
    LinkCard:true
  }

 }) 
    return res.status(200).json(name)
 }else{
  return res.status(404).json({
    msg:"请登录账号",
    ok:"NOUSER"
  })
 }
}
export default GET
