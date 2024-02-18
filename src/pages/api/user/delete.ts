import {NextApiRequest,NextApiResponse} from 'next'
import  {useRouter} from 'next/router'
import {PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
const Where=async (req:NextApiRequest,res:NextApiResponse)=>{
  const {id}=JSON.parse(req.body) 
 
  await prisma.user.delete({
      where:{
        id:id,
      },
     

  })
  return res.status(200).send({
    ok:'1',
    msg:'删除成功',
  })
}
export default Where
