'use client'
import * as React from "react"
import {useRequest} from 'ahooks'
import Loding from "@/components/ui/loding"
import { LinkCardGather } from "../../../../../type"
const LinklistCard=({msg}:{msg:LinkCardGather})=>{
  return <div className='w-20 h-20 border-red-100 border '>
      {msg.title} + {msg.LinkCard?.length}
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
    loadingDelay:300,
    onBefore:(res)=>{
      console.log(data);
    },
    onSuccess:(res)=>{
      SetlinkCard(res)
    },
    onFinally:(res)=>{
      console.log(res);
      
    }
  })
 return  <div className="flex justify-around w-[100%] gap-2">
 { loading ? <Loding/>: LinkListCardS.map((i,index)=>{
      return <LinklistCard  key={index} msg={i}></LinklistCard >
    })
}
 </div>
 
  
     
}
export default COM
