import {NextApiRequest,NextApiResponse} from 'next'
import  {useRouter} from 'next/router'
const Where=(req:NextApiRequest,res:NextApiResponse)=>{
   const router=useRouter
   console.log(req);
   res.status(200).json({'ok':req.find})

}
export default Where
