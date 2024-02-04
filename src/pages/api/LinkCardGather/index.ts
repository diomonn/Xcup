import { LinkCard,LinkCardGather, Prisma, PrismaClient } from '@prisma/client'
import {NextApiRequest,NextApiResponse}  from 'next'
import {authOptions} from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
const prisma = new PrismaClient() 
async function Issession(A:Function,B:Function,Session:any) {
  // const Session=await getServerSession(req,res,authOptions)
  if (Session) {
    A()
  }else{
    B()
  }
}
async function GET(req:NextApiRequest,res:NextApiResponse) {
  const Session=await getServerSession(req,res,authOptions)
 if (Session) {
  await prisma.linkCardGather.findMany({
    where:{
      userId:Session?.user.id 
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
  const {title}=await JSON.parse(req.body)
  if (Session) {
    await prisma.linkCardGather.create({
      data:{
        userId:Session?.user.id,
        title:title,
        open:false
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
