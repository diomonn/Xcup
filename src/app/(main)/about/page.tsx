'use client'
import { ZhiMangXing } from '@/style/fonts';
import classNames from 'classnames';
import React from 'react';
import Typed from 'typed.js'
export default function Home() {

     
   return <div className='flex justify-center items-center flex-col' >
    <div className={classNames('w-96 md:w-[50vw] ',ZhiMangXing.className)}>
    <div className={classNames('text-xl text-ellipsis dark:text-white')} >
    当今社交媒体和推荐算法固然方便，却也成就了信息茧房的墙壁，将我们置于狭隘的信息环境之中。但我们的心灵渴求更多，我们的思想渴望更广阔的视野，我们的想象力渴望更远大的空间。因此，我们迫切需要一个能够突破这层茧壳的平台，让我们跨越传统算法的束缚，探索人类智慧的无边境
    </div>
    <div className={classNames('text-xl text-ellipsis dark:text-white')} >
    欢迎来到我们的殿堂——这是一个灵感的宇宙，一个由用户共同建造的知识星辰。在这里，您不会被固有的偏好所束缚，而是被引导至思想的广阔天空和文化的浩瀚海洋。我们的使命不仅仅是传递信息，更是点燃心灵之火，激发智慧的火花，让每一个灵魂在知识的洪流中航行。
    </div>
    <div className={classNames('text-xl text-ellipsis dark:text-white')} >
    无论您是一位追求艺术的探险家、一位求知的领航者，抑或是一位文化的传递者，这个平台都将为您提供一个开放的舞台，让您的声音与世界共鸣，让您的思想与时代共谱华章。因为我们相信，当无数智慧之光汇聚成一片星海时，人类的认知界限将被彻底打破，智慧的种子将在每一个灵魂中生根发芽。
    </div>
    <div className={classNames('text-md text-ellipsis text-end dark:text-white')} >
         diamond(OpenAI)
    </div>
    </div>
   </div>
  
}
