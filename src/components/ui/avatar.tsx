
import * as Avatar from '@radix-ui/react-avatar';
export default function avatar({src,}:{src:string}) {
  
  return <div>
     <Avatar.Root className=" inline-flex items-center 
  justify-center align-middle overflow-hidden select-none w-11 h-11
  rounded-full bg-black 
 ">
    <Avatar.Image
      className="w-11 h-11 object-cover rounded-full"
      src={src!}
      alt="Colm Tuite"
    />
    <Avatar.Fallback className="w-full h-full flex items-center justify-center
     bg-white text-violet-600 font-serif leading-3 font-medium
    " delayMs={600}>
      CT
    </Avatar.Fallback>
  </Avatar.Root> 
  </div>
  
}
