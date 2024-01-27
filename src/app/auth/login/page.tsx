'use client'
import {useState as UseState} from "react";
import {signIn} from 'next-auth/react'
export default function login(){
  const logos=['github','email','googel']
  const [isGitHubLoading, setIsGitHubLoading] = UseState<boolean>(false);
  const login = async () => {
    setIsGitHubLoading(true);
    signIn("email", { // 登录方法，第一个参数标注平台
      redirect:true,
      callbackUrl: '', // 设置登录成功后的回调地址
    });
  };
  return <div className="flex justify-center items-center h-[100vh]">
    <div className=" relative  rounded-lg p-3 w-[500px] shadow-orange-300 shadow-md bg-white flex flex-col justify-around ">
<div>
<h1>login</h1>
<div>User name </div>
<div>password----------</div>
    <div>
</div>  
<div  onClick={login} className="flex  justify-around w-full relative        ">
  github登录

 {/* {
  logos.map((e,index)=>{
    return <div key={index} className=" w-10 h-10 rounded-full bg-slate-200">{e}</div>
  })
 }  */}
</div>
    </div>
  </div>
  </div>
}
