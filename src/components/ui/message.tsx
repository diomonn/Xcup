'use client'
import { message } from '@prisma/client'
import {BellIcon,PersonIcon} from '@radix-ui/react-icons'
import {HoverCard} from '@radix-ui/themes'
import {useRequest} from 'ahooks'
import React, { useState } from 'react'
async function GET() {
  const data =  await fetch('http://localhost:3000/api/Spenmsg/Get').then(res=>{
    return res.json()
  })

return data
}
async function Deletemessage(id:string) {
  const data =  await fetch('http://localhost:3000/api/Spenmsg/delete',{
    method:'delete',
    body:JSON.stringify({id})
  }).then(res=>{
    return res.json()
  })

return data
}
async function Yeseva_One(projectId:string,receiverId:string,LinkCardGather:string,fn:Function) {
  // projectId,receiverId,LinkCardGather
  const data =  await fetch('http://localhost:3000/api/Spenmsg/Yeseva_One',{
    method:"POST",
    body:JSON.stringify({
      projectId,
      receiverId,
      LinkCardGather,
    })
  }).then(res=>{
    return res.json()
  })  
 if (data.ok==='1') {
  console.log(data);
  fn()
 }
  return data
   
}
export default function Message(){
  const [res,Setmessage]= useState<message[]>([])
  const {loading,error,data}=useRequest(GET,{
    onSuccess:(data)=>{
        console.log(data);
        Setmessage(data) 
    }
  })
  const SetR=async (index:number)=>{
    console.log(res[index].id);
    
    await Deletemessage(res[index].id).then((res)=>{
   console.log(res,'删除成功');
   
    })
    Setmessage(res.filter((el,i)=>index!==i))

   }
  return <HoverCardEM  SetR={SetR} Messagelist={res}> 
    <div className='w-6 h-6 relative rounded-full  hover:text-yellow-500 hover:dark:text-green-400 transition-colors'>
  <BellIcon className='w-6 h-6'></BellIcon>
  {loading}
 {
   !loading?<div className=' absolute border-yellow-500 border-[1px] flex justify-center items-center w-2 h-2 rounded-full    right-0'>
   {res?.length?<div className='w-1 h-1 bg-red-500 rounded-full animate-pulse'></div>:''}
</div>:null
 }
  </div></HoverCardEM>
}
const HoverCardEM=({children,Messagelist,SetR}:{children:React.ReactNode,Messagelist:message[],SetR:Function})=>{
 return  <HoverCard.Root > 
    <HoverCard.Trigger >
      {children}
    </HoverCard.Trigger>
    {Messagelist.length?<HoverCard.Content className=' text-yellow-50' alignOffset={-50} >
      <div>
        {Messagelist.map((el,index)=>{
         if (el.type==='yellow') {
          <div key={index} className='mt-1 border border-darkthemeColor p-2 relative'>
          <div className='flex gap-2 items-center'>
          <PersonIcon className='dark:text-violet-600'></PersonIcon>
          <span className=' text-ellipsis text-red-500'>{el.title}</span>
          </div>
         <div className='ml-4 max-w-44 text-wrap'>
           {el.msg}
         </div>
         <div className='flex justify-around w-full '>
          <button className=' bg-red-500 rounded-md p-1' onClick={()=>{SetR(index)}}>删除</button>
         </div>
         </div>
         }else{
          return  <div key={index} className='mt-1 border border-darkthemeColor p-2 relative'>
          <div className='flex gap-2 items-center'>
          <PersonIcon className='dark:text-violet-600'></PersonIcon>
          <span className=' text-ellipsis text-red-500'>{el.title}</span>
          </div>
         <div className='ml-4 max-w-44 text-wrap'>
           {el.msg}
         </div>
         <div className='flex justify-around w-full '>
          <button className=' bg-red-500 rounded-md p-1' onClick={()=>{SetR(index)}}>拒绝</button>
          <button className='  bg-green-500 rounded-md p-1 ' onClick={()=>{
             // 通过请求,然后向发送方返回通过请求
             Yeseva_One(el.LinkCardGather,el.senderId,el.LinkCardGather,SetR(index))  
          }}>接受</button>
         </div>
       </div>
         }
        })}
      </div>
    </HoverCard.Content>:''} 
  </HoverCard.Root>
 
}
