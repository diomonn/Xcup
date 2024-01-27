'use client'
import Image from 'next/image' 
import Link from 'next/link'
import {MaterialSymbolsLightCloseRounded} from '@/Svg/index'
const Card=({description,image,title,url}:Link)=>{
  return <div className='mt-3 relative  shadow-orange-300 shadow-md   hover:bg-card  cursor-pointer  w-[600px] min-w-92 h-auto p-2 rounded-lg gap-2 flex justify-between '>
  {
    image?<img className='w-40 h-40' src={image} alt="" />:''
  }
     <div>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <h1 className='text-[14px] font-bold'>{description}</h1>
     </div>
     <div className=' absolute -right-3 border rounded-full  border-black -top-3
      hover:border-[red] hover:-translate-y-1 transform'><MaterialSymbolsLightCloseRounded className=' hover:text-[red] font-sans text-2xl'/></div>
  </div>
}
const Linklist=({link}:{link:Link[]})=>{
 return <div className='flex flex-col-reverse  gap-5'>
   {link.map(msg=>{
    // eslint-disable-next-line react/jsx-key
    return <Card title={msg.title} description= {msg.description} image={msg.image} url={msg.url} ></Card>
   }) }
   </div>
}

export default Linklist
