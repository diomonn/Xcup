"use client"
import {  useState as UseState,useEffect as UseEffect,  useRef as UseRef,useContext as UseContext} from "react";
import {Rubik, Zheng} from '@/style/fonts'
import Linklist from '@/components/List'
import { signOut, useSession as Usession } from 'next-auth/react'
import { Link } from "../../../type";
import Typed from 'typed.js';
import {motion} from 'framer-motion'
import Toast from "@/components/ui/Toast";
import { ZhiMangXing } from "@/style/fonts";
import classNames from "classnames";
import LinkLink from "next/link";
const main= ()=>{
  const [url,seturl]=UseState('')
  const [link,Setlink]=UseState(false)
  const {data}=Usession()
  const [list,Setlist]=UseState<Link[]>([])
  
  const [open, setOpen] =UseState({
    open:false,
    msg:'',
    type:true
  });
  const el=UseRef(null)
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

  UseEffect(() => {

    const typed = new Typed(el.current, {
      strings: ['电影','游戏','友链','音乐','书籍','博客'],
      typeSpeed: 150,
      loop:true
      
    });
    return () => {
      typed.destroy();
    };
  }, []);

  

return <div className=" overflow-x-hidden   p-2 flex justify-center flex-col items-center  ">
<Toast open={open.open} setOpen={setOpen} type={open.type} msg={open.msg}></Toast>
   <div className="flex justify-center items-center flex-col sm:w-[600px] w-[100vw-20px]">
   <div className="m-2">
      <h1  className=" font-bold text-3xl dark:text-violet-600" onClick={async ()=>{
  await signOut({ redirect: true, });

      }}>
        <span className={Rubik.className} >
          diamond
        </span>
      </h1>
     </div>
     <h1  className={classNames(" font-bold mb-1 text-lg dark:text-violet-600",ZhiMangXing.className)} onClick={async ()=>{
  await signOut({ redirect: true, });

      }}>
       分享你喜欢的<span className={classNames(ZhiMangXing.className,' text-green-700 mx-2')} ref={el} >
          {/* diamond */}
        </span>
      </h1>
   
    
    
     <div className="flex gap-1 w-50vw sm:gap-3">
     <input type="text" placeholder="https://github.com/" value={url}
     onChange={(e)=>{seturl(e.target.value)} 
    }   
     className="p-2 no-underline 
      dark:placeholder-violet-200
      
     sm:w-80  w-64 border boder-black bg-white rounded-sm " name="" id="" />
      <motion.div 
         whileHover={{scale:1.1}}
      >
      <button onClick={()=>a(url)} disabled={link} className=" cursor-pointer but-form flex items-center text-nowrap text-sm  h-auto">
{!link?'添加链接':'解析中-'}
         </button>  
      </motion.div>   
     </div>
     { 
     data?.user?null:<p className="text-xs mt-2  dark:text-violet-600">
      <LinkLink className="text-red-500" href={'api/auth/signin'}>登录</LinkLink> 
      用来保存和浏览,我们会一起分享<LinkLink href={'about'} className="mx-3 text-white">ABOUT THIS</LinkLink>
     </p>
     }
    <Linklist link={list} Setlist={Setlist} ></Linklist>
   </div>
   
</div>
  
}
export default main
