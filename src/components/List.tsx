'use client'
import {Zheng} from '@/style/fonts'
import { Link } from '../../type'
import {GETNAME,PostCardList} from '@/hooks/api'
import {useRequest,clearCache} from 'ahooks'
import {HamburgerMenuIcon,GlobeIcon} from '@radix-ui/react-icons'
import * as Menubar from '@radix-ui/react-menubar';
import DialogDemo from '@/components/ui/Dalog'
import * as React from 'react'
import { LinkCard, LinkCardGather } from '@prisma/client'
import classNames from 'classnames'
import {ScrollArea} from '@radix-ui/themes'
const post=async (Link:Link,ID:string)=>{
  const res= await fetch('http://localhost:3000/api/LinkCard',{
    method:'POST',
    body:JSON.stringify({...Link,ID})
   }).then(res=>{
    return res.json()
   })
   console.log(res);
}
const MenubarItem=({link,title}:{link:Link,title:string})=>{
  const [Switch,setSwitch]=React.useState(true)
  const { data , loading ,refresh,run} = useRequest(GETNAME, {
    cacheKey: 'cacheKey-demo',
    refreshOnWindowFocus:true,
    onSuccess(data, params) {
        console.log(data);
        setSwitch(true)
    },
    onBefore(params){
      console.log(params,"开始执行");
      
    }
  }); 
  React.useEffect( ()=>{
    clearCache('cacheKey-demo')
setSwitch(false)
    run()
      console.log(title);
  },[title])
 if ( !data && loading&&!Switch) {
  return <Menubar.Item className='MenubarItem' disabled><GlobeIcon/>加载中</Menubar.Item>
 }
 return( 
  data?.map((e:LinkCardGather)=>{
    return <Menubar.Item key={e.id}
    onClick={()=>{post(link,e.id)}}
    className='MenubarItem'>{e.title} {loading}</Menubar.Item>
  })
 )

} 
interface LIST extends Link{
  Setlist:Function
}
const Card= ({description,image,title,url,Setlist}:LIST)=>{
  const [newtitle,Settitle]=React.useState(title)
  const [color,SetCardBordercolor]=React.useState(false)
  const [listTitle,SetlistTitle ]=React.useState('一个合适的标题')
  const SetlistTitlefun=async (LIST:string)=>{
    SetlistTitle(LIST)
    await PostCardList(LIST).then(()=>{
      SetCardBordercolor(true)
    })

    }
  const SplitUrlIcon=(url:string)=>{
    const str=url.split('/')
    return str[0]+'//'+str[2]+'/favicon.ico'
  }
  return <div className={classNames('lg:w-[45vw]  sm:w-[65vw] w-[90vw] border-[0.5px]  rounded-xl' ,
  'backdrop-filter backdrop-blur-md h-40 p-2 backdrop-opacity-5 backdrop-invert bg-white/30 hover:bg-slate-300/30',
  ' justify-between cursor-pointer  flex gap-2', color?'border-gray-600':'border-green-500 border-2')}>   
    <div className=' w-32   rounded-xl overflow-hidden flex
      justify-center items-center accent-indigo-600  border-r-[0.5px] border-black '>
     {
      image?<img className='w-full h-full ' src={image} alt="title" />:<img className='w-[50%] h-[50%]' src={SplitUrlIcon(url)} alt="title" />
     }
    </div>
    <div className=' w-[calc(45vw-8rem)]   overflow-hidden'>
      <p className={classNames(Zheng.className,' text-[#0f1419]')} >{newtitle}</p>
      <p className={classNames(Zheng.className,' text-[#536471]')}>{description}</p>
    </div>
    <div>
    <Menubar.Root >
      <Menubar.Menu>
        <Menubar.Trigger className="hover:border-red-100 hover:border-[0.5px] p-1">
          <HamburgerMenuIcon/>
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content className="border border-balck bg-white rounded-md " align="start" sideOffset={5} alignOffset={-3}>
            <Menubar.Item className="MenubarItem" onSelect={e=>{
              e.preventDefault()
            }}>
              <DialogDemo SetTitle={Settitle} title={title} msg='更改你的标题,使他一目了然吧!' content='标题'/>
            </Menubar.Item>
            <Menubar.Item className="MenubarItem">
              备注
            </Menubar.Item>
         
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Sub>
              <Menubar.SubTrigger className="MenubarSubTrigger">
              添加到合集
              </Menubar.SubTrigger>
              <Menubar.Portal>
                <Menubar.SubContent className="MenubarSubContent max-h-44 overflow-y-auto" alignOffset={5}>
                <ScrollArea type="always" scrollbars="horizontal" size="1" style={{ height: 100 }}>
                <MenubarItem link={{
          description,image,title:newtitle,url
        }} title={listTitle}/>

         <Menubar.Item className='MenubarItem ' onSelect={e=>{
              e.preventDefault()
            }}>
         <DialogDemo SetTitle={SetlistTitlefun} title={listTitle} msg='新建合集,想一个适合标题' content='新建合集'/>
         </Menubar.Item>
                </ScrollArea>
        
          </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item className="MenubarItem">
             <text onClick={()=>{Setlist()}} className='text-red-500 text-ellipsis'>删除</text>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
</Menubar.Root>
    </div>
  </div> 
}
const Linklist=({link,Setlist}:{link:Link[],Setlist:Function})=>{
 const setlist=(Cardid:number)=>{
  Setlist( link.filter((i,index)=>Cardid!==index))
 }
 return <div className=' flex justify-center   flex-col p-3 gap-2'>
  {/* <Card title='yi1' description='你好啊' image='https://okami.my.id/wp-content/uploads/2023/06/1LaLaLa1.jpg'
  url='www.baidu.com'  setlist
  ></Card> */}
   {link.map((msg,index)=>{
    // eslint-disable-next-line react/jsx-key
    return <Card key={index} title={msg.title} Setlist={()=>{setlist(index)}} description= {msg.description} image={msg.image} url={msg.url} ></Card>
   }) }
   </div>
}

export default Linklist
