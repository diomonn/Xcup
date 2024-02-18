'use client'
import * as Auth from 'next-auth/react'
import Avatar from '@/components/ui/avatar'
import {Zheng,roboto_mono} from '@/style/fonts'
import classNames from 'classnames'
import {Getday} from '@/hooks/day'
import {Pencil2Icon} from '@radix-ui/react-icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Userpage() {
  const { data: session,update,status }=Auth.useSession()
  const [data,setdata]=useState({
    image:session?.user.image,
    name:session?.user.name
  })

  const [open,setopen]=useState(false)
const router=useRouter()


const updataUser=async ()=>{
   await fetch('api/user/updata',{
          method:"POST",
          body:JSON.stringify({
            id:session?.user.id,
            name:data.name,
            image:data.image,
          })
        }).then(res=>{
          console.log(res);
          
          return res
    })     
  }
  const deleteUser=async ()=>{
    await fetch('api/user/delete',{
      method:"POST",
      body:JSON.stringify({
        id:session?.user.id
      })
    }).then(res=>{
      if (res.ok) {
        Auth.signOut()
      }
      router.replace('/')
      return res
})    
  }
  const Out=()=>{
    Auth.signOut()
    router.replace('/')

  }
 return <div className="  flex justify-center items-center">
 <div className=''>
   <div className='flex  relative left-[50%] -translate-x-[50%]  z-50 flex-col items-center border border-blackp  border-b-0 border-r-0  border-l-0 w-[100px] p-3 h-[100px] rounded-tl-[50px]  rounded-tr-[50px]'>
<Avatar  src={data.image!}></Avatar>

<h1 className={classNames(Zheng.className,' text-2xl font-bold px-2 bg-blue-300 dark:bg-black dark:text-violet-600')}>{session?.user.name}</h1>
   </div>
   <div className='dark:text-white -z-1 w-[90vw] sm:w-[50vw]  dark:border-violet-600  h-[65vh] transition-all border-2 border-black border-b-0 relative p-4 bottom-7 start-0'>
   <Pencil2Icon className=' absolute  right-3 text-2xl' onClick={()=>setopen(!open)
   }></Pencil2Icon>

     <div>
      <h1 className={classNames('m-2 text-xl text-center dark:text-blue-600 text-ellipsis ',roboto_mono.className)}>{session?.user.id}</h1>
     </div>
     <ul>
     <li className='w-full border-black border-b-[0.5px] p-2'>
        <label className='flex items-center gap-2'>
        <span className={classNames('w-12 m-1 ',Zheng.className)}>用户名</span>
          {
            !open?<span className='w-70% overflow-hidden text-sm'>{data.name}</span>:
            <input placeholder={data.name!}
            onChange={(e)=>{
              setdata({
             image:data.image,
             name:e.target.value
              })
            }}
            type="text" className=' dark:text-white dark:border-violet-600 border-2 text-black  bg-white/0 w-[80%] input-form' />
          }
        </label>
      </li>
      <li className='w-full border-black border-b-[0.5px] p-2'>
        <label className='flex items-center gap-2'>
        <span className={classNames('w-12 m-1 ',Zheng.className)}>头像</span>
          {
            !open?<span className='w-70% overflow-hidden text-sm'>{data.image}</span>:
            <input 
            onChange={(e)=>{
              setdata({
             image:e.target.value,
             name:data.name
              })
            }}
            placeholder={data.image!} type="text" className=' dark:text-white dark:border-violet-600 border-2 text-black  bg-white/0 w-[80%] input-form' />
          }
        </label>
      </li>
      
  
     </ul>
    <div className='w-full absolute flex bottom-6 justify-around'>
    <button
    onClick={()=>{Out()}}
    className='p-1 px-2
    
    dark:text-white border-yellow-500 rounded-sm border h-10'>登出</button>
    <button className='p-1 px-2 dark:text-white border-blue-600 rounded-sm border h-10'
        onClick={()=>{updataUser()}}

    >更新</button>

    <button 
            onClick={()=>{deleteUser()}}

    className='p-1 px-2 dark:text-white border-red-600 rounded-sm border h-10'>注销</button>
   </div>
   </div>
   
 </div>
 </div> 
}
