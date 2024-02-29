import {Zheng} from '@/style/fonts'
import {HamburgerMenuIcon,GlobeIcon} from '@radix-ui/react-icons'
import * as Menubar from '@radix-ui/react-menubar';
import DialogDemo from '@/components/ui/Dalog'
import * as React from 'react'
import classNames from 'classnames'
import { Link as link } from '../../../../../type';
import Link from 'next/link'
interface LIST extends link{
  Setlist:Function
}
const Card= ({description,image,title,url,Setlist}:LIST)=>{
  const [newtitle,settitle]=React.useState([{
    msg:title,
    name:'标题'
  }])
  const SplitUrlIcon=(url:string)=>{
    const str=url.split('/')
    return str[0]+'//'+str[2]+'/favicon.ico'
  }
  return <div className={classNames('w-full border-[0.5px]  rounded-xl' ,
  'backdrop-filter backdrop-blur-md h-40 p-2 backdrop-opacity-5 backdrop-invert bg-white/30 hover:bg-slate-300/30 dark:bg-slate-300/30 dark:hover:bg-slate-300' ,
  ' justify-between cursor-pointer  flex gap-2', 'border-green-500 border-2','dark:border-violet-600')}>   
    
    <div className=' w-[100px] sm:w-32    rounded-xl overflow-hidden flex
      justify-center items-center accent-indigo-600  border-r-[0.5px] border-black '>
      <Link href={url} legacyBehavior>
     <a className='w-full h-full' target='_blank'>
     {
      image?<img className='w-full h-full ' src={image} alt="title" />:<img className='w-[50%] h-[50%]' src={SplitUrlIcon(url)} alt="title" />
     }
     </a></Link>
    </div>
    
    <div className='  flex-1   overflow-hidden'>
     <Link href={url} legacyBehavior>
     <a target='_blank'>
     <p className={classNames(Zheng.className,' text-[#0f1419]')} >{newtitle[0].msg}</p>
      <p className={classNames(Zheng.className,' text-[#536471]')}>{description}</p>
     </a>
     </Link>
   </div>
    <div>
    <Menubar.Root >
      <Menubar.Menu>
        <Menubar.Trigger className="hover:border-red-100 hover:border-[0.5px] p-1">
          <HamburgerMenuIcon/>
        </Menubar.Trigger>
        <Menubar.Portal >
          <Menubar.Content className="border border-balck bg-white rounded-md " align="start" sideOffset={5} alignOffset={-3}>

            <Menubar.Item className="MenubarItem" onSelect={e=>{
              e.preventDefault()
            }}>
              <DialogDemo SetTitle={settitle} title={newtitle} msg='更改你的标题,使他一目了然吧!' content='编辑Card'>
              <p >编辑标题</p>
            </DialogDemo>
            </Menubar.Item>
            <Menubar.Item className="MenubarItem">
              备注
            </Menubar.Item>
           
           
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item className="MenubarItem">
             <p onClick={()=>{Setlist()}} className='text-red-500 text-ellipsis'>删除</p>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
</Menubar.Root>
    </div>
  </div> 
}
export default Card
