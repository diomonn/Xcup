// import second from 'next/'
import { PrismaClient } from '@prisma/client'
import {NextApiRequest,NextApiResponse}  from 'next'
import authID from '@/hooks/auth'
const prisma=new PrismaClient()
async function GET(req:NextApiRequest,res:NextApiResponse) {
  const [Session]=await authID(req,res)
  const {id,linkcardMany,title,description,deleteMany,userId}=JSON.parse(req.body)
console.log(Session?.user.id,userId);
  if (Session?.user.id===userId) {
  const name=await prisma.linkCardGather.update({
  where:{
    id:id
  },
  data:{
    title,
    description,
    LinkCard:{
      deleteMany:{
        id:{
          in: deleteMany
        }
      },
      createMany:{
        data:linkcardMany
      }
    }
  },
  
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

