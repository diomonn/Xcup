"use client"
import {  useState as UseState,useEffect as UseEffect, useEffect,} from "react";
import {Rubik} from '@/style/fonts'
import Linklist from '@/components/List'
import { signOut } from 'next-auth/react'
import { Link } from "../../../type";
import Toast from "@/components/ui/Toast";
const main= ()=>{
  const [url,seturl]=UseState('')
  const [link,Setlink]=UseState(false)
  const [list,Setlist]=UseState<Link[]>([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] =UseState({
    open:false,
    msg:'',
    type:true
  });
  const a=async (e:string)=>{
    Setlink(true)
      const res= await fetch('api/F',{
        method:"POST",
        body:JSON.stringify({url:e})
      }).then(res=>{
        Setlink(false)
        return res
      })    
      if (res.status!=200) {
        const {msg}=await res.json()
        setOpen({
          open:true,
          msg:msg,
          type:false
        })
        setTimeout(() => {
          setOpen({...open,...{open:false}})
        }, 1500);
      }else{
       const {description,image,title,url}=await res.json()
       setOpen({
        open:true,
        msg:title,
        type:true
      })
      setTimeout(() => {
        setOpen({...open,...{open:false}})
      }, 1500);

       Setlist([...list,{description,image,title,url}])
      }

  }
 
  

return <div className="w-[100vw] p-2 flex justify-center flex-col items-center  ">
<Toast open={open.open} setOpen={setOpen} type={open.type} msg={open.msg}></Toast>
   <div className="flex justify-center items-center flex-col sm:w-[600px] w-[100vw-20px]">
   <div className="m-2">
      <h1  className=" font-bold text-3xl dark:text-violet-600" onClick={async ()=>{
  await signOut({ redirect: true, });

      }}>
        <span className={Rubik.className}>Diamond</span>
      </h1>
     </div>
     <div className="flex gap-1 w-50vw sm:gap-3">
     <input type="text" placeholder="https://github.com/" value={url}
     onChange={(e)=>{seturl(e.target.value)} 
    }   
     className="p-2 no-underline 
      dark:placeholder-violet-200
      
     sm:w-80  w-64 border boder-black bg-white rounded-sm " name="" id="" />
         <button onClick={()=>a(url)} className=" but-form flex items-center text-nowrap text-sm  h-auto">
{!link?'添加链接':'解析中-'}
         </button>
     </div>
    {/* <Linklist link={list} Setlist={Setlist} ></Linklist> */}
   </div>
   
</div>
  
}
export default main
