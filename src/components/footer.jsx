import Link from 'next/link'
import {url} from '@/config/type'
import {Text} from '@radix-ui/themes'
import {GitHubLogoIcon,TwitterLogoIcon} from '@radix-ui/react-icons'
const footer=()=>{
  return <div className=" fixed bottom-1 w-[100vw] flex justify-center items-center">
   <ul className=' flex gap-3 text-black dark:text-white items-center'>
   <Text className='text-am'>@2024</Text>|
       <Link href={url.github} ><GitHubLogoIcon></GitHubLogoIcon></Link>|
       <Link href={url.twitter} ><TwitterLogoIcon/></Link>|
       <Link href={'/'} >贾雨竹</Link>|
       
    </ul>
  </div>
    
  }
  export default footer
  