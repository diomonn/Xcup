'use client'
import {Zheng} from '@/style/fonts'
import { Link } from '../../type'
import { LinkCard } from '@prisma/client'
import {HamburgerMenuIcon} from '@radix-ui/react-icons'
import * as Menubar from '@radix-ui/react-menubar';
import DialogDemo from '@/components/ui/Dalog'
import * as React from 'react'
// import {POSTCARD} from '@/hooks/api'

// import {use} from 'ahooks'
const post=async (Link:Link,ID:string)=>{
  const res= await fetch('http://localhost:3000/api/LinkCard',{
    method:'POST',
    body:JSON.stringify({...Link,ID})
   }).then(res=>{
    return res.json()
   })
   console.log(res);
}

const Card= ({description,image,title,url}:Link)=>{
  const [newtitle,Settitle]=React.useState(title)
  const [open,SetOpen]=React.useState(false)
  const SplitUrlIcon=(url:string)=>{
    const str=url.split('/')
    return str[0]+'//'+str[2]+'/favicon.ico'
  }
  return <div className='lg:w-[45vw]  sm:w-[65vw] w-[90vw] border-[0.5px] border-gray-600  rounded-xl 
  backdrop-filter backdrop-blur-md h-40 p-2 backdrop-opacity-5 backdrop-invert bg-white/30 hover:bg-slate-300/30
   justify-between
  cursor-pointer  flex
   gap-2
  '>
   
    <div className=' w-32   rounded-xl overflow-hidden flex
      justify-center items-center accent-indigo-600  border-r-[0.5px] border-black '>
     {
      image?<img className='w-full h-full ' src={image} alt="title" />:<img className='w-[50%] h-[50%]' src={SplitUrlIcon(url)} alt="title" />
     }
    </div>
    <div className=' w-[calc(45vw-8rem)] flex flex-col gap-2 justify-center  overflow-hidden'>
      <p className={Zheng.className}>{newtitle}</p>
      <p className={Zheng.className}>{description}</p>
    </div>
    <div>
    <Menubar.Root className="">
      <Menubar.Menu>
        <Menubar.Trigger className="hover:border-red-100 hover:border-[0.5px] p-1">
          <HamburgerMenuIcon/>
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content className="border border-balck bg-white " align="start" sideOffset={5} alignOffset={-3}>
            <Menubar.Item className="MenubarItem" onSelect={e=>{
              e.preventDefault()
            }}>
              <DialogDemo SetTitle={Settitle} title={title} msg='更改你的标题,使他一目了然吧!' content='标题'/>
            </Menubar.Item>
            <Menubar.Item className="MenubarItem">
              备注
            </Menubar.Item>
            <Menubar.Item className="MenubarItem" disabled>
              
            </Menubar.Item>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Sub>
              <Menubar.SubTrigger className="MenubarSubTrigger">
              添加到合集
              </Menubar.SubTrigger>
              <Menubar.Portal>
                <Menubar.SubContent className="MenubarSubContent" alignOffset={5}>
                  <Menubar.Item className="MenubarItem" onClick={e=>{
                    post({title:newtitle,description,url,image},'65be5010e4d2796df77c6026')
                  }}>Email Link</Menubar.Item>
                  <Menubar.Item className="MenubarItem">Messages</Menubar.Item>
                  <Menubar.Item className="MenubarItem">Notes</Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item className="MenubarItem">
             <text className='text-red-500 text-ellipsis'>删除</text>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
</Menubar.Root>
    </div>
  </div> 
}
const Linklist=({link}:{link:Link[]})=>{
 return <div className=' flex justify-center   flex-col p-3 gap-2'>
  <Card title='yi1' description='你好啊' image='https://okami.my.id/wp-content/uploads/2023/06/1LaLaLa1.jpg'
  url='www.baidu.com'
  ></Card>
   {link.map(msg=>{
    // eslint-disable-next-line react/jsx-key
    return <Card title={msg.title} description= {msg.description} image={msg.image} url={msg.url} ></Card>
   }) }
   </div>
}

export default Linklist
