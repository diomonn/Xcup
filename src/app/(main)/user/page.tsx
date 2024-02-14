'use client'
import * as Auth from 'next-auth/react'
import Avatar from '@/components/ui/avatar'
import {Zheng} from '@/style/fonts'
import classNames from 'classnames'
// 修改头像,名称
// 邀请共创消息处理
// 

//
// 获取这个dom 然后在原本的父亲dom中删除它,加到body中
// 然后开始移动动画简单说就是 
//
export default function Userpage() {
  const { data: session,update,status }=Auth.useSession()
 return <div className="  flex justify-center items-center">
 <div className=''>
   <div className='flex  relative left-[50%] -translate-x-[50%]  z-50 flex-col items-center border border-blackp  border-b-0 border-r-0  border-l-0 w-[100px] p-3 h-[100px] rounded-tl-[50px]  rounded-tr-[50px]'>
<Avatar  src={session?.user.image!}></Avatar>

<h1 className={classNames(Zheng.className,' text-2xl font-bold px-2 bg-blue-300 dark:bg-black dark:text-violet-600')}>{session?.user.name}</h1>
   </div>
   <div className='dark:text-white -z-1 w-[90vw] sm:w-[50vw] dark:border-violet-600  h-[65vh] transition-all border-2 border-black border-b-0 relative bottom-7 start-0'>
     <ul>
      <li>1.修改头像</li>
      <li>2.修改名称</li>
      <li>3.订阅链接</li>
      <li>4.共创邀请</li>
     </ul>
   </div>
 </div>
 </div> 
}
