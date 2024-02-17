import {NextApiRequest,NextApiResponse} from 'next'
import authID from '@/hooks/auth'
import {PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
const GET=async (req:NextApiRequest,res:NextApiResponse)=>{   
  const [Session]=await authID(req,res)
    if (Session?.user.id) {
      const data= await prisma.message.findMany({
        where:{
          receiverId:Session?.user.id
        }
      }
     )
      return res.status(200).json(data)
    }else{
      return res.status(404).json({
        msg:"请登录账号",
        ok:"NOUSER"
      })
     }
}
export default GET
