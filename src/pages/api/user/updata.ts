import {NextApiRequest,NextApiResponse} from 'next'
import  {useRouter} from 'next/router'
import {PrismaClient} from '@prisma/client'
import { getSession } from 'next-auth/react'
const prisma=new PrismaClient()
const updataUser=async (id:string,name:string,image:string)=>{
  return await prisma.user.update({
    where:{
      id:id,
    },
    data:{
      name,
      image,
    }
}).then((res)=>{
  console.log(res);
  
   return    res 
})
}
const Where=async (req:NextApiRequest,res:NextApiResponse)=>{
  const {id,name,image}=JSON.parse(req.body) 
 
  async function updateUserAndSession(req: any, userId: any) {
    //  更新数据库中的用户信息
    const updatedUser = await updataUser(id,name,image);
    //  获取最新的会话信息
    const session = await getSession({ req });
    //  更新会话信息
    if (session) {
      session.user = { ...session.user, ...updatedUser };
    }
    return session;
  }
  updateUserAndSession(req,id,).then(msg=>{
    res.status(200).send({
      ok:'1',
      msg:'成功',
     
    })
  }).catch(err=>{
    res.status(500).send({
      ok:'1',
      msg:'失败',
     
    })
  })
  
  
}
export default Where
