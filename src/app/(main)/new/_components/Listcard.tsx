'use client'
import * as React from "react"
import {useRequest} from 'ahooks'
import {ZhiMangXing,Zheng,Rubik} from '@/style/fonts'
import Loding from "@/components/ui/loding"
import Card from '@/components/ui/card'
import { LinkCardGather } from "../../../../../type"
import classNames from "classnames"



const LinklistCard=({msg}:{msg:LinkCardGather})=>{
   return <div className=' sm:w-96 dark:bg-black w-[90vw] rounded-lg border p-2  
    shadow-sm flex flex-col h-full mb-4'>
     <div className="p-2" >  
      <h1 className={classNames(ZhiMangXing.className,'text-xl dark:text-white')} >{msg.title}</h1>
      <h3 className={classNames(Zheng.className,'text-sm text-gray-600')}>
     {msg.description}
     </h3>
     </div>
    <div className="p-2">
    {
      msg.LinkCard?.map((i,index)=>{
        return index<2? <Card image={i.image} key={index} description={i.description} title={i.title} url={i.url} createdAt={i.createdAt}></Card>:''
      })
     }
    </div>
    {
       msg.LinkCard?.length!>=2?<div className="w-full flex justify-center p-2">
      
       <div  className=" text-sm bg-lime-600  text-white dark:bg-blue-950 rounded-md  p-2">
       更多 {msg.LinkCard?.length}
     </div>
      
       </div>:''
    }
  </div>
} 
const COM=()=>{
  const [LinkListCardS,SetlinkCard]=React.useState<LinkCardGather[]>([])
  const PostLinkCard=async ()=>{
     const data=  await fetch('http://localhost:3000/api/LinkCardGather',{
      method:'GET'
    }).then(res=>{
      return res.json()
    })    
    console.log(data);
    return data
  }
  const { loading, data } =useRequest(PostLinkCard,{
    cacheKey:"aaaa",  
    onSuccess:(res)=>{
      SetlinkCard(res)
    },
    
  })
  // <LinklistCard  key={index} msg={i}></LinklistCard >
 return  <div>
        <div className="dark:text-white p-10 pb-3 pt-3 ">
           <text className={Rubik.className}>发现新的宝藏连接</text>
           <h3 className=" text-sm text-gray-600"> 
           这里是全体用户们公开的宝藏 合集
           </h3>
        </div>
 <div className="flex 
  items-center md:items-start  md:justify-around flex-col
    md:flex-row   flex-wrap   ">
 
 { loading ? <Loding/>: LinkListCardS.map((i,index)=>{
      return <LinklistCard   key={index} msg={i}></LinklistCard >
    })
}
 </div>
</div>
 
 
  
     
}
export default COM
