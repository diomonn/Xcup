
import Image from 'next/image' 
import Link from 'next/link'

import Userinfo from './Userinfo'
const header=()=>{
  return <header className="
  border-b mb-5 px-1 md:px-10 py-3 flex justify-between items-center
  dark:text-violet-600 sm:p-4 
  ">
    <div className='flex gap-2 md:gap-10 items-center  text-nowrap '>
      <Link href={'/'}><Image className='dark:bg-violet-600 p-2 rounded-xl' width={100} height={100} src={'/next.svg'} alt='LOGO'></Image></Link>
        <Link href='/new' className='w-14   hover:text-yellow-500 hover:dark:text-green-400 transition-colors'>新链接</Link>
         <Link href='/my' className='w-14   hover:text-yellow-500 hover:dark:text-green-400 transition-colors'>我的链接</Link>
    </div>
      <Userinfo></Userinfo>
  </header>
}

export default header
