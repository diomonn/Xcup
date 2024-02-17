import {NextApiRequest,NextApiResponse} from 'next'
import authID from '@/hooks/auth'
import {PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
const Where=async (req:NextApiRequest,res:NextApiResponse)=>{   
  const [Session]=await authID(req,res)
  const {receiverId,LinkCardGather,msg,type,title,frid}=JSON.parse(req.body)
  console.log(receiverId);
  
  const  c=await prisma.user.findFirst({
    where:{
      id:receiverId
    },
     select:{
      id:true
     }
  })
  console.log(c);
  
  if (!c) {
    return res.status(404).json({
      msg:"请确认该用户id是否正确或存在",
      ok:"NOUSER"
    })
  } 
    if (Session?.user.id&&c) {
      const data= await prisma.message.create({
        data:{
          senderId:Session?.user.id,
          receiverId,
          title,
          LinkCardGather,
          msg,
          frid,
          state:'未读',
          type,
        }
       })
       return res.status(200).json(data)
    }else{
      return res.status(404).json({
        msg:"请登录账号",
        ok:"NOUSER"
      })
     }
}
export default Where
