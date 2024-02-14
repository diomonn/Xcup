'use client'
import Image from 'next/image' 
import Link from 'next/link'
import Avatar from '@/components/ui/avatar'
import Darkmode from '@/components/ui/darkmode'
import * as Auth from 'next-auth/react'
const Userinfo=()=>{
  const { data: session,update,status }=Auth.useSession()
     if (session) {
    return <div className='flex gap-2 md:gap-5  items-center'>
 <Darkmode></Darkmode>
    <Link href={'/user'}><Avatar src={session.user.image} ></Avatar></Link>
    </div>
   }else{
    return <Link href={'/auth/login'}>登录</Link>
   }

}
const header=()=>{
  const User=false
  return <header className="
  border-b mb-5 px-4 md:px-10 py-3 flex justify-between items-center
  dark:text-violet-600 
  ">
    <div className='flex gap-5 md:gap-10 items-center  text-nowrap '>
      <Link href={'/'}><Image className='dark:bg-violet-600 p-2 rounded-xl' width={100} height={100} src={'/next.svg'} alt='LOGO'></Image></Link>
        <Link href='/new' className='w-14'>新链接</Link>
         <Link href='/new' className='w-14'>我的链接</Link>
    </div>
      <Userinfo></Userinfo>
  </header>
}

export default header
