import { LinkCard,LinkCardGather, Prisma, PrismaClient } from '@prisma/client'
import {NextApiRequest,NextApiResponse}  from 'next'
import authID from '@/hooks/auth'
import { getServerSession } from 'next-auth/next'
const prisma = new PrismaClient() 
async function GET(req:NextApiRequest,res:NextApiResponse) {
  const [Session]=await authID(req,res)
 if (Session) {
  await prisma.linkCardGather.findMany({
    where:{
      open:true
      // open:true
    },
    include:{
      LinkCard:true
    }
  }).then(msg=>{
    return res.status(200).json(msg)
  })
 }else{
  return res.status(401).json({
    msg:"请登录账号",
    ok:"NOUSER"
  })
 }
}

async function POST(req:NextApiRequest,res:NextApiResponse) {
  const [Session]=await authID(req,res)

  const {title,open,description}=await JSON.parse(req.body)
  if (Session) {
    await prisma.linkCardGather.create({
      data:{
        userId:Session?.user.id,
        title,
        description,
        open,
      }       
    }).then(el=>{
      return  res.status(200).json(el)
    })
    
  }else{
    return res.status(404).json({
      msg:"请登录账号",
      ok:"NOUSER"
    })
  }
  
}
async function DELETE(req:NextApiRequest,res:NextApiResponse) {
  const [Session]=await authID(req,res)
  const {title,id}=await JSON.parse(req.body)
  if (Session) {
   await prisma.linkCardGather.delete({
     where:{
       userId:Session?.user.id,
       title:title,
       id:id
     }
   }).then(msg=>{
     return res.status(200).json(msg)
   })
  }else{
   return res.status(404).json({
     msg:"请登录账号",
     ok:"NOUSER"
   })
  }
}
async function name(req:NextApiRequest,res:NextApiResponse) {
  if (req.method==='GET') {
    GET(req,res)
  }else if(req.method==='POST'){
   POST(req,res)
  }
}

export  default name
