import {NextApiRequest,NextApiResponse} from 'next'
import authID from '@/hooks/auth'
import {PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
const GET=async (req:NextApiRequest,res:NextApiResponse)=>{   
  const [Session]=await authID(req,res)
  const  {id} = JSON.parse(req.body)
  if (Session?.user.id) {
      const data=prisma.message.delete({
       where:{
        id:id
       }
      }).then(res=>{
        console.log(res);
        
      })
    return res.status(200).json({
      data:data,
      msg:'删除成功',
     ok:'1'
    })
  }else{
      return res.status(404).json({
        msg:"请登录账号",
        ok:"NOUSER"
      })
     }
}
export default GET
