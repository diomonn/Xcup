"use client"
import {  useState as UseState,useEffect as UseEffect,} from "react";
import {Rubik} from '@/style/fonts'
import CN from 'classnames'
import {getSession,useSession as UseSession} from 'next-auth/react'
import Linklist from '@/components/List'
import { signIn,signOut } from 'next-auth/react'
import { LinkCard } from "@prisma/client";
import { Link } from "../../type";

const main= ()=>{
  const [url,seturl]=UseState('a')
  const [link,Setlink]=UseState(false)
  const [list,Setlist]=UseState<Link[]>([])
  const { data: session,update,status }= UseSession()

  UseEffect(()=>{
    console.log(session );  
  },[update],
  )
  const a=async (e:string)=>{
    Setlink(true)
      const {description,image,title,url}:LinkCard= await fetch('http://localhost:3000/api/F',{
        method:"POST",
        body:JSON.stringify({url:e})
      }).then(res=>{
        setTimeout(() => {
          if (res) {
            Setlink(false)
          }
        }, 500);
        return res.json()
      })
      Setlist([...list,{description,image,title,url}])
    }
return <div className="w-[100vw] flex justify-center flex-col items-center  ">
     <div className="m-2">
      <h1  className=" font-bold text-3xl" onClick={async ()=>{
  await signOut({ redirect: true, });

      }}>
        <text className={Rubik.className}>Diamond</text>
      </h1>
     </div>
     <div className="flex gap-3">
     <input type="text" placeholder="这里" value={url}
     onChange={(e)=>{seturl(e.target.value)}
    }   
     className="p-2 no-underline w-80" name="" id="" />
         <button onClick={()=>a(url)} className="p-2 bg-black text-white rounded-md hover:bg-slate-600">
{!link?'添加链接':'解析中-'}
         </button>
     </div>
     <Linklist link={list}></Linklist>
</div>
  
}
export default main
