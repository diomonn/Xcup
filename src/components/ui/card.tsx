
import { Link as linktype } from '../../../type'
import Link from 'next/link'
import * as HoverCard from '@radix-ui/react-hover-card';
import {DateDifference,Getday} from '@/hooks/day'
export default function Cardbox({url,description,image,title,createdAt}:linktype){
  // const router=useRouter()
  return <Link href={url}>
  <div  className='flex w-full gap-2  h-42  sm:h-auto p-2 hover:bg-slate-100/30 '   >
        
   <div className='w-40 h-full '>
   <img className='w-full h-full ' src={image} alt="" />  
   </div>
      <div className='flex flex-col flex-wrap gap-2  md:w-48 w-full '> 
        <h3     className='dark:text-slate-300 leading-relaxed  w-full text-base md:text-lg font-medium md:font-semibold cursor-pointer break-words overflow-hidden'>
          {title}
        </h3>
       <h3 className=' overflow-hidden sm:line-clamp-none  line-clamp-3  h-auto  w-full text-base text-gray-600 md:text-xs font-medium md:font-semibold cursor-pointer break-words '>
{description}
       </h3>
      <HoverCard.Root>
        <HoverCard.Trigger>
        <h4 className=' text-left rounded-md text-sm text-gray-500/50'>{DateDifference(createdAt)}</h4>
        </HoverCard.Trigger>
        <HoverCard.Content>
        <h4 className='bg-black text-xs text-white p-1 
        '>{Getday(createdAt)}</h4>
        </HoverCard.Content>
      </HoverCard.Root>
      </div>
    
     </div>
  </Link>
}
