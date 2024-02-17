'use client'
import Link from 'next/link'
import Avatar from '@/components/ui/avatar'
import Darkmode from '@/components/ui/darkmode'
import Message from '@/components/ui/message'
import * as Auth from 'next-auth/react'
const Userinfo=()=>{
  const { data: session,update,status }=Auth.useSession()
   if (session) {
    return <div className='flex gap-2 md:gap-5  items-center'>
    {session?<Message></Message>:null}
    <Darkmode></Darkmode>
    <Link href={'/user'}><Avatar src={session.user.image!} ></Avatar></Link>
    </div>
   }else{
    return <div className='flex gap-2 md:gap-5  items-center'>
    {session?<Message></Message>:null}
    <Darkmode></Darkmode>
    <Link href={'/auth/login'}>登录</Link>
    </div>
    
    
   }
}
export default Userinfo
