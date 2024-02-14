'use client'
import * as React from "react";
import { signIn } from 'next-auth/react'
import Form from './_conmonent/form'

export default function login({}) {
 
  const onSubmit=(e:any)=>{
    console.log(e);
    e.preventDefault();
    
  }
  
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
 

  return <div className="flex justify-center items-center h-[100vh] p-3">
    <div className=" relative  rounded-lg p-3 w-[30rem] h-96 shadow-orange-300 shadow-md
      bg-violet-600  items-center flex flex-col gap-1">
          <h1>注册/登录</h1>
       <Form buttonmsg={'注册'} ></Form>
    </div>
  </div>
}
