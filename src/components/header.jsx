import Image from 'next/image' 
import Link from 'next/link'
const header=()=>{
  const User=false
  return <header className="
  p-10
  text-white dark:bg-black flex w-[100%]
   justify-between items-center h-[5vh] 
  ">
    <div className='flex gap-10'>
     <Image width={100} height={100} src={'/next.svg'} alt='LOGO'></Image>
         <Link href='/new'>New</Link>
         <Link href='/new'>my</Link>
    </div>
    <div>
      <button>登录</button>
    </div>
  </header>
}

export default header
