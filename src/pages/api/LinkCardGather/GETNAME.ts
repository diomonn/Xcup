// import second from 'next/'
import { LinkCard,LinkCardGather, Prisma, PrismaClient } from '@prisma/client'
import {NextApiRequest,NextApiResponse}  from 'next'
import { getServerSession } from 'next-auth/next'
const prisma=new PrismaClient()
import {authOptions} from '../auth/[...nextauth]'
async function GET(req:NextApiRequest,res:NextApiResponse) {
  const Session=await getServerSession(req,res,authOptions)
 if (Session) {
  await prisma.linkCardGather.findMany({
    where:{
      userId:Session?.user.id
    },
    select:{
      title:true,
      id:true,
      open:true
    },
   
  }).then(msg=>{
    console.log("请求中---------");
    
    return res.status(200).json(msg)
  })
 }else{
  return res.status(404).json({
    msg:"请登录账号",
    ok:"NOUSER"
  })
 }
}
export default GET
