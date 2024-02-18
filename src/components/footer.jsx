import Link from 'next/link'
import {url} from '@/config/type'
import {Text} from '@radix-ui/themes'
import {GitHubLogoIcon,TwitterLogoIcon} from '@radix-ui/react-icons'
const footer=()=>{
  return <div className=" fixed bottom-1 w-[100vw] flex justify-center items-center">
   <ul className=' flex gap-3 text-black dark:text-white items-center'>
       <Link href={url.github} ><GitHubLogoIcon></GitHubLogoIcon></Link>
       <Link href={url.twitter} ><TwitterLogoIcon/></Link>
       <Text className='text-am'>贾雨竹</Text>
    </ul>
  </div>
    
  }
  export default footer
  