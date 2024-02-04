import { LinkCard ,PrismaClient } from '@prisma/client'
import {NextApiRequest,NextApiResponse}  from 'next'
import {authOptions} from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
const prisma = new PrismaClient() 

async function GET(req:NextApiRequest,res:NextApiResponse) {
  const Session=await getServerSession(req,res,authOptions)
  const {ID}=JSON.parse(req.body)
 if (Session) {
  await prisma.linkCard.findMany({
    where:{
      LinkCardGatherID:ID
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
async function POST(req:NextApiRequest,res:NextApiResponse) {
  const Session=await getServerSession(req,res,authOptions)
  const {title,ID,image,url,description}=await JSON.parse(req.body)
  if (Session) {
    await prisma.linkCard.create({
      data:{
        LinkCardGatherID:ID,
        title:title,
        image,
        url,
        createNameRole:Session.user.name!,
        description,
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
  const Session=await getServerSession(req,res,authOptions)
  const {title,ID,id}=await JSON.parse(req.body)
  if (Session) {
   await prisma.linkCard.delete({
     where:{
       id,
       LinkCardGatherID:ID,
       title:title,
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
