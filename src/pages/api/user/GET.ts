import {NextApiRequest,NextApiResponse} from 'next'
import  {useRouter} from 'next/router'
import {PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
const Where=async (req:NextApiRequest,res:NextApiResponse)=>{
   
   
  //  await prisma.linkCardGather.deleteMany({
  //        where:{
  //         open:true
  //        }
  //   })  
     await prisma.linkCard.deleteMany({

     })     
    res.status(200).json("data")
    
   

}
export default Where
