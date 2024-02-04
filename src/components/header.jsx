'use client'
import Image from 'next/image' 
import Link from 'next/link'
import Avatar from '@/components/ui/avatar'
import {MaterialSymbolsModeNightOutlineRounded,MaterialSymbolsSunnyOutline} from '@/Svg/index'
import * as Auth from 'next-auth/react'
const Userinfo=()=>{
  const { data: session,update,status }=Auth.useSession()
     if (session) {
    return <div className='flex gap-5  '>
     <MaterialSymbolsModeNightOutlineRounded  className='w-10 h-10'/> 
     <MaterialSymbolsSunnyOutline  className='w-10 h-10'/> 
    <Avatar src={session.user.image} Size='XXL'></Avatar>
    </div>
   }else{
    return <div>登录</div>
   }

}
const header=()=>{
  const User=false
  return <header className="
  p-10
  text-white dark:bg-black flex w-[100%]
   justify-between items-center h-[5vh] 
  ">
    <div className='flex gap-10'>
     <Image width={100} height={100} src={'/next.svg'} alt='LOGO'></Image>
         <Link href='/new'>New</Link>
         <Link href='/new'>my</Link>
    </div>
    <div>
      <Userinfo></Userinfo>
    </div>
  </header>
}

export default header
