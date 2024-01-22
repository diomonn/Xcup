'use client'
import Image from 'next/image' 
import Link from 'next/link'

const Card=({description,image,title,url}:Link)=>{
  return <div className='mt-3  hover:bg-card  cursor-pointer  w-[600px] min-w-92 h-auto p-2 rounded-lg gap-2 flex justify-between '>
  {
    image?<img className='w-40 h-40' src={image} alt="" />:''
  }
     <div>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <h1 className='text-[14px] font-bold'>{description}</h1>
     </div>
  </div>

}
const Linklist=({link}:{link:Link[]})=>{
 return <div className='flex flex-col gap-5'>
   {link.map(msg=>{
    // eslint-disable-next-line react/jsx-key
    return <Card title={msg.title} description={msg.description} image={msg.image} url={msg.url} ></Card>
   }) }
   </div>

}

export default Linklist
