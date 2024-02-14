import {authOptions} from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import {NextApiRequest,NextApiResponse}  from 'next'

async function authID(req:NextApiRequest,res:NextApiResponse) {
  const Session=await getServerSession(req,res,authOptions)
  return [Session]
}
export default authID
