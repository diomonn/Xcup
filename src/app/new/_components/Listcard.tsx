'use client'
import * as React from "react"
import {useRequest} from 'ahooks'
import { LinkCardGather } from "../../../../type"
import Loding from "@/components/ui/loding"
const LinklistCard=({title}:{title:String})=>{
  return <div className='w-20 h-20 border-red-100 border '>
      {title}
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
 return  <div>
 { loading ? <Loding/>: LinkListCardS.map((i,index)=>{
      return <LinklistCard  key={index} title={i.title}></LinklistCard >
    })
}
 </div>
 
  
     
}
export default COM
