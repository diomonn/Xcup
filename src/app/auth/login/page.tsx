'use client'
import { useState as UseState } from "react";
import { signIn } from 'next-auth/react'
import Button from './_conmonent/Button'
export default function login() {
  const logos = ['github', 'email', 'googel']
  const [isGitHubLoading, setIsGitHubLoading] = UseState<boolean>(false);
  const login = async () => {
    setIsGitHubLoading(true);
    signIn("email", { // 登录方法，第一个参数标注平台
      redirect: true,
      callbackUrl: '', // 设置登录成功后的回调地址
    }).then((response) => {
      // 处理身份验证成功的情况
      alert(`身份验证成功，用户信息：${response} `)
    }).catch((error) => {
      // 处理身份验证失败的情况
      console.error('身份验证失败，错误信息：', error);
    })
  };
  return <div className="flex justify-center items-center h-[100vh]">
    <div className=" relative  rounded-lg p-3 w-[400px] h-96 shadow-orange-300 shadow-md bg-white flex flex-col gap-1">
      <div>
        <h1>login</h1>
        <div>User name </div>
        <div>password----------</div>
        <div>
        </div>

<Button text="="></Button>
        <div onClick={login} className="flex  justify-around w-full relative        ">
          github登录
        </div>
      </div>
    </div>
  </div>
}
