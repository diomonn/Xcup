import { LinkCard,LinkCardGather, Prisma, PrismaClient } from '@prisma/client'
import {NextApiRequest,NextApiResponse}  from 'next'
import authID from '@/hooks/auth'
const prisma = new PrismaClient() 
async function deletelinkcard(id:string, ) {
  await prisma.linkCard.deleteMany({
    where:{
      LinkCardGatherID:id
    }
  })
  await prisma.userProject.deleteMany({
    where:{
      projectId:id
    }
  })
}
async function GET(req:NextApiRequest,res:NextApiResponse) {

  await prisma.linkCardGather.findMany({
    where:{
      open:true,
    },
    include:{
      userTeaam:true,
      LinkCard:true
    }
  }).then(msg=>{
    return res.status(200).json(msg)
  })
 
}

async function POST(req:NextApiRequest,res:NextApiResponse) {
  const [Session]=await authID(req,res)
  const {title,open,description}=await JSON.parse(req.body)
  console.log(Session?.user);
  
  if (Session) {
    await prisma.linkCardGather.create({
      data:{
        userId:Session?.user.id,
        title,
        description:description,
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
  const {title,id,UserId}=await JSON.parse(req.body)
  if (Session&&Session.user.id===UserId) {
    await deletelinkcard(id)
   await prisma.linkCardGather.delete({
     where:{
       userId:Session?.user.id,
       title:title,
       id:id,
     },
   }).then(msg=>{
    res.status(200).json({
      ok:1,
      msg:"成功删除"
    })
   })
  }else{
   return res.status(404).json({
     msg:"请登录账号",
     ok:"NOUSER"
   })
  }
  // res.status
}
async function name(req:NextApiRequest,res:NextApiResponse) {
  if (req.method==='GET') {
    GET(req,res)
  }else if(req.method==='POST'){
   POST(req,res)
  }else{
    
    DELETE(req,res)
  }
}

export  default name
