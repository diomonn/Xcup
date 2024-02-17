import {NextApiRequest,NextApiResponse} from 'next'
import authID from '@/hooks/auth'
import {PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
const GET=async (req:NextApiRequest,res:NextApiResponse)=>{   
  const [Session]=await authID(req,res)
  const  {projectId,receiverId,LinkCardGather} = JSON.parse(req.body)
    if (Session?.user.id) {
      const data= await prisma.userProject.create({
           data:{
            userId:Session.user.id,
            projectId:projectId,
           }
      }
     )
    if (data.id) {
     await prisma.message.create({
        data:{
          senderId:Session?.user.id,
          receiverId,
          title:"接受邀请",
          LinkCardGather,
          msg:`${Session.user.name}通过了你的邀请,你们现在可以一起创作了`,
          frid:'',
          state:'未读',
          type:'yellow',
        }
       }).then(data=>{
       if (data) {
        return res.status(200).json({
          ok:'1',
          msg:"成功建立同好友谊"
        })
       }
       })
    }    
    }else{
      return res.status(404).json({
        msg:"请登录账号",
        ok:"NOUSER"
      })
     }
}
export default GET
