import {NextApiRequest,NextApiResponse} from 'next'
import  {useRouter} from 'next/router'
import {PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
const Where=async (req:NextApiRequest,res:NextApiResponse)=>{
   const {id}=req.query
   if (req.query.id) {
    const data=  await prisma.user.findUnique({
         where:{
             id:id as string
         },
         select:{
            image:true,
            name:true,
            id:true
         }
    })  
        res.status(200).json(data)
    
   }
}
export default Where
