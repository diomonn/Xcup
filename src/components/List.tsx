'use client'
import { Zheng } from '@/style/fonts'
import { Link } from '../../type'
import { GETNAME, PostCardList } from '@/hooks/api'
import { useRequest, clearCache } from 'ahooks'
import { HamburgerMenuIcon, GlobeIcon } from '@radix-ui/react-icons'
import * as Menubar from '@radix-ui/react-menubar';
import DialogDemo from '@/components/ui/Dalog'
import * as React from 'react'
import { LinkCardGather } from '@prisma/client'
import classNames from 'classnames'
import {motion} from 'framer-motion'
import { ScrollArea } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
const post = async (Link: Link, ID: string) => {
  console.log(Link, ID);
  try {
    await fetch('api/LinkCard', {
      method: 'POST',
      body: JSON.stringify({ ...Link, ID })
    }).then(res => {
      return res.json()
    })
  } catch {

  }
}
const MenubarItem = ({ link, title }: { link: Link, title: string }) => {
  const {data:session,status}=useSession()
  const { data, loading, refresh, run } = useRequest(GETNAME, {
    cacheKey: 'cacheKey-demo',
    refreshOnWindowFocus: true,
  });

  if (!session?.user.id&&status==='unauthenticated') {
    return <Menubar.Item className='MenubarItem' disabled><GlobeIcon />请先登录</Menubar.Item>
  }else if(!data && loading){
    return <Menubar.Item className='MenubarItem' disabled><GlobeIcon />加载中</Menubar.Item>
  }
  return (
    data?.map((e: LinkCardGather) => {
      return <Menubar.Item key={e.id}
        onClick={() => { post(link, e.id) }}
        className='MenubarItem'>{e.title} {loading}</Menubar.Item>
    })
  )

}
interface LIST extends Link {
  Setlist: Function
}
const Card = ({ description, image, title, url, Setlist }: LIST) => {
  const [newtitle, settitle] = React.useState([{
    msg: title,
    name: '标题'
  }])
  const [color, SetCardBordercolor] = React.useState(false)
  const [listTitle, SetlistTitle] = React.useState([{
    msg: '',
    name: '标题'
  },
  {
    msg: '',
    name: '详情'
  },
  {
    open: true,
    msg: true,
    name: '公开'
  }
  ]
  )
  const SplitUrlIcon = (url: string) => {
    const str = url.split('/')
    return str[0] + '//' + str[2] + '/favicon.ico'
  }
  const SetlistTitlefun = async (content: any) => {
    SetlistTitle(content)
    const data = await PostCardList(listTitle[0].msg as string, listTitle[1].msg as string, listTitle[2].open!).then(res => {
      return res
    }) as LinkCardGather
    await post({ description, image: image ? image : SplitUrlIcon(url), title, url }, data.id).then(res => {
      console.log(description, image ?? SplitUrlIcon(url), title, url);
      Setlist()
    })

  }


  return <div className={classNames('w-full border-[0.5px]  rounded-xl',
    'backdrop-filter backdrop-blur-md h-40 p-2 backdrop-opacity-5 backdrop-invert bg-white/30 hover:bg-slate-300/30 dark:bg-slate-300/30 dark:hover:bg-slate-50',
    ' justify-between cursor-pointer  flex gap-2', color ? 'border-gray-600' : 'border-green-500 border-2', 'dark:border-violet-600')}>
    <div className=' w-[100px] sm:w-32    rounded-xl overflow-hidden flex
      justify-center items-center accent-indigo-600   border-black '>
      {
        image ? <img className='w-full h-full ' src={image} alt="title" /> : <img className='w-[50%] h-[50%]' src={SplitUrlIcon(url)} alt="title" />
      }
    </div>
    <div className='  flex-1   overflow-hidden'>
      <p className={classNames(Zheng.className, ' text-[#0f1419]')} >{newtitle[0].msg}</p>
      <p className={classNames(Zheng.className, ' text-[#536471]')}>{description}</p>
    </div>
    <div>
      <Menubar.Root >
        <Menubar.Menu>
          <Menubar.Trigger className="hover:border-red-100 hover:border-[0.5px] p-1">
            <HamburgerMenuIcon />
          </Menubar.Trigger>
          <Menubar.Portal >
            <Menubar.Content className="border border-balck bg-white rounded-md " align="start" sideOffset={5} alignOffset={-3}>
              <Menubar.Item className="MenubarItem hover:text-white" onSelect={e => {
                e.preventDefault()
              }}>
                <DialogDemo SetTitle={settitle} title={newtitle} msg='更改你的标题,使他一目了然吧!' content='编辑标题'>
                  <p >编辑标题</p>
                </DialogDemo>
                {/* <DialogDemo SetTitle={settitle} title={newtitle} msg='更改你的标题,使他一目了然吧!' content='标题'/> */}
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
                    <ScrollArea
                      type="always" scrollbars="vertical" style={{ height: 150 }}
                    >
                      <MenubarItem link={{
                        description, image, title: newtitle[0].msg, url
                      }} title={newtitle[0].msg} />

                      <Menubar.Item className='MenubarItem ' onSelect={e => {
                        e.preventDefault()
                      }}>
                        <DialogDemo SetTitle={SetlistTitlefun} title={listTitle} msg='新建合集,想一个适合标题!' content='新建合集'>
                          <p className=''> 新建合集</p>
                        </DialogDemo>

                      </Menubar.Item>
                    </ScrollArea>

                  </Menubar.SubContent>
                </Menubar.Portal>
              </Menubar.Sub>
              <Menubar.Separator className="MenubarSeparator" />
              <Menubar.Item className="MenubarItem">
                <p onClick={() => { Setlist() }} className='text-red-500 text-ellipsis'>删除</p>
              </Menubar.Item>
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>
    </div>
  </div>
}
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}
const Linklist = ({ link, Setlist }: { link: Link[], Setlist: Function }) => {

  const setlist = (Cardid: number) => {
    Setlist(link.filter((i, index) => Cardid !== index))
  }
  return <div className='   flex justify-center   flex-col p-3 gap-2'>
    {/* <Card title='yi1' description='你好啊' image='https://okami.my.id/wp-content/uploads/2023/06/1LaLaLa1.jpg'
  url='www.baidu.com'  setlist
  ></Card> */}

{ link.map((msg,index)=>(
 <motion.div 
 initial={{ opacity: 0 }}
variants={
{open: { opacity: 1, x: 0 },
 closed: { opacity: 0, x: "-100%" },}
  }
 whileInView={{ opacity: 1 }}
 whileHover={{scale:1.1}}
 layoutId={index.toString()} key={index}  >
  <Card    title={msg.title} createdAt={msg.createdAt} description={msg.description} image={msg.image} url={msg.url} Setlist={()=>SetSlice(index)}></Card>
</motion.div>
))}
  </div>
}

export default Linklist
