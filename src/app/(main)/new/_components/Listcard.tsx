'use client'
import * as React from "react"
import {useRequest} from 'ahooks'
import {ZhiMangXing,Zheng,Rubik} from '@/style/fonts'
import Loding from "@/components/ui/loding"
import Card from '@/components/ui/card'
import { LinkCardGather } from "../../../../../type"
import classNames from "classnames"
import Link from "next/link"
export const LinklistCard=({msg}:{msg:LinkCardGather})=>{ 
  
   return <div className=' sm:w-96 dark:bg-black w-[90vw] rounded-lg border p-2  
    shadow-sm flex flex-col h-full mb-4'>
     <div className="p-2" >  
      <Link href={`/new/detail?id=${msg.id}`}>      <h1 className={classNames(ZhiMangXing.className,'text-xl dark:text-white')} >{msg.title}</h1>
</Link>
      <h3 className={classNames(Zheng.className,'text-sm text-gray-600')}>
     {msg.description}
     </h3>
     </div>
    <div className="p-2">
    {
      msg.LinkCard?.map((i,index)=>{
        return index<2? <Card  image={i.image} key={index} description={i.description} title={i.title} url={i.url} createdAt={i.createdAt}></Card>:''
      })
     }
    </div>
    {
       msg.LinkCard?.length!>2?<div className="w-full flex justify-center p-2">
      
      <Link href={`/new/detail?id=${msg.id}`}>
      <div  className=" text-sm bg-lime-600  text-white dark:bg-blue-950 rounded-md  p-2">
       更多 {msg.LinkCard?.length}
     </div>
</Link></div>:''
    }
  </div>
} 
const COM=({bol=true}:{bol:boolean})=>{
  const [LinkListCardS,SetlinkCard]=React.useState<LinkCardGather[]>([])
  const PostLinkCard=async ()=>{
     const data=  await fetch(`api/${bol?'LinkCardGather':'LinkCardGather/getmy'}`,{
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
 return  <div>
        <div className="dark:text-white p-10 pb-3 pt-3 ">
           <h1 className={Rubik.className}>
            {bol?'发现新的宝藏连接':'我的链接和受邀的链接'}
           </h1>
           <h3 className=" text-sm text-gray-600" > 
           {bol?'这里是全体用户们公开的宝藏' :
           '我的链接可以直接修改,受邀链接只可以通过首页单次添加,我会在后续进行优化'}          </h3>
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
