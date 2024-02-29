import Dark from '@/components/ui/darkmode'
import Link from 'next/link'
export default function not_fount() {
  return <div className="h-[100vh]  flex justify-center items-center " >
    <div className=" w-[40rem] flex-col  flex justify-around dark:bg-violet-600 items-center h-96 bg-blue-600">
    <h1 className="text-[150px] tracking-wider">
     404
     </h1>
    <div className='flex gap-2 dark:text-blue-900'>
      <Link href={'/'}>首页</Link>
      <Link href={'/api/auth/signin'}>登录</Link>
      <Dark></Dark>
    </div>
    </div>
  </div>
}

