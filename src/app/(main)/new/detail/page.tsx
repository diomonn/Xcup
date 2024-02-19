'use client'
import {useSearchParams} from 'next/navigation'
import {copy} from '@/hooks/title'
import Card from '../_components/card'
import {useRequest} from 'ahooks'
import useToast from '@/hooks/Toast'
import {GearIcon} from '@radix-ui/react-icons'
import React, { useEffect, useRef, useState } from 'react'
import { LinkCardGather as L, User } from '@prisma/client'
import Avatar from '@/components/ui/avatar'
import  Dalog from '@/components/ui/Dalog'
import Toast from '@/components/ui/Toast'
import {motion,AnimatePresence} from 'framer-motion'
import { Link, Msgtitle } from '../../../../../type'
import {  useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {PhRssLight,PhShare} from '@/Svg/index'
interface LinkCardGather extends L{
  description:string,
  userTeaam:{
    user:{
      image:string,
      name:string
      id:string
    }
  }[]
}
const SplitUrlIcon=(urla:string)=>{
  const str=urla.split('/')
  return str[0]+'//'+str[2]+'/favicon.ico'
}
export default function Home() {
  const A=useSearchParams()
  const router=useRouter()
  const {open,setOpen,Setopentime}=useToast()
  const ID=A?.get('id')
  const [LinkCardGather,SetlinkCardGather]=React.useState<LinkCardGather>()
  const [LinkListCardS,SetlinkCard]=React.useState<Link[]>([])
  const [user,setuser]=useState<User>()
  const [url,seturl]=useState('')
  const deleteMany=useRef<string[]>([])
  const [Setting,setbol]=useState(true)
  const linkcardMany=useRef<any[]>([])
  const { data: session,update,status }=useSession()

  const SetSlice=(index:number)=>{
    if (LinkListCardS[index].id) {
      console.log(LinkListCardS[index]);
      deleteMany.current.push(LinkListCardS[index].id!)
    }
    SetlinkCard(LinkListCardS.filter((i,num)=>num!=index))
  }
  const [newtitle,settitle]=React.useState<Msgtitle[]>([{
    msg:'',
    name:'标题'
  },{
    msg:'',
    name:'详情'
  }])
  const [spen,setspen]=React.useState<Msgtitle[]>([{
    msg:'',
    name:'你选择邀请人的ID'
  }])
  const spenmsg=async (a:Msgtitle[])=>{
    setspen(a)
    return await fetch(`/api/Spenmsg/post`,{
      method:"POST",
      body:JSON.stringify({
        receiverId:spen[0].msg,
        title:'一则邀请信息',
        LinkCardGather:LinkCardGather?.id,
        msg:`${session?.user.name}(${session?.user.id})邀请你参加它的合集${LinkCardGather?.title},请求确认是否参加`,
        frid:'',
        type:'green',
      }),
    }).then(res=>{
       
          console.log(spen);
          Setopentime('发送成功',true)  
          setspen([])    
      return res.json()
    }).catch(()=>{
      Setopentime('发送失败清重试',false)      
    })
  }

  useEffect(()=>{
    settitle([{
      msg:LinkCardGather?.title!,
      name:'标题'
    },{
      msg:LinkCardGather?.description!,
      name:'详情'
    }])    
    
  },[LinkCardGather])
  
const GETlink=async ():Promise<LinkCardGather>=>{
  return await fetch(`/api/LinkCardGather/where/${ID}`,{
      method:"GET",
    }).then(res=>{
      return res.json()
    })
}
const User=async (ID:string)=>{
  const user= await fetch(`/api/user/where/${ID}`,{
      method:"GET",
    }).then(res=>{
      return res.json()
    })
    console.log(user);
    
  setuser(user)
}
const {loading,error,data}=useRequest(GETlink,{
  ready:ID!==null,
  onSuccess:(res:any)=>{
    SetlinkCardGather(res)
    SetlinkCard(res.LinkCard)
    User(res.userId)
  },
  onError:()=>{
    setOpen({
      type:false,
      msg:`${error}加载失败,请刷新重试`,
      open:true,
    })
  }
 })
const updata=async ()=>{
    return await fetch(`/api/LinkCardGather/updata`,{
      method:'POST',
      body:JSON.stringify({
          id:LinkCardGather?.id!,
         title:newtitle[0].msg,
         description:newtitle[1].msg,
         userId:LinkCardGather?.userId,
         deleteMany:deleteMany.current??[],
         linkcardMany:linkcardMany.current??[],
         
      })
    }).then(res=>{
     console.log(res);
     
      if (res.ok) {
        Setopentime('保存成功',true)
      }else{
        throw new Error('这不是你的数据或者你没有此操作权限');
      }
      return res.json()
    }).catch(err=>{
      Setopentime(`${err}`,false)
    })
}

const dlete=async ()=>{
  return await fetch(`/api/LinkCardGather`,{
      method:'delete',
      body:JSON.stringify({
        UserId:LinkCardGather?.userId,
        title:LinkCardGather?.title,
        id:LinkCardGather?.id,
      })
    }).then(res=>{
      if (res.ok) {

        Setopentime('删除成功',true)
        setTimeout(() => {
          router.push('/new')
        }, 500);
      }else{
        throw new Error('这不是你的数据或者你没有此操作权限');
      }
      return res.json()
    }).catch(err=>{
      Setopentime(`${err}`,false)
    })
}
  
const a=async (e:string)=>{
    const res= await fetch('/api/F',{
      method:"POST",
      body:JSON.stringify({url:e})
    }).then(res=>{
      return res
    })    
    if (res.status!=200) {
      const {msg}=await res.json()
      setOpen({
        open:true,
        msg:msg,
        type:false
      })
      setTimeout(() => {
        setOpen({...open,...{open:false}})
      }, 1500);
    }else{
     const {description,image,title,url}=await res.json()
     setOpen({
      open:true,
      msg:title,
      type:true
    })
    setTimeout(() => {
      setOpen({...open,...{open:false}})
    }, 1500);

     SetlinkCard([...LinkListCardS,{description,image,title,url}])
    //  SetlinkCard([...LinkListCardS,{description,image,title,url}])
    linkcardMany.current.push({description,image:image??SplitUrlIcon(url),title,url,createNameRole:user?.name})
    }

}
const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
} 
  
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}
const [selectedId, setSelectedId] = useState<any>(null)
function RSS(): void {
   if (LinkCardGather?.id) {
    router.push(`/api/feed/${LinkCardGather?.id}`)
   }else{
    setOpen({
      msg:'等待加载后重试',
      type:false,
      open:true
    })
   }
  }

  return (
    <div className='px-8'>
      <Toast msg={open.msg} open={open.open} type={open.type} setOpen={Setopentime}></Toast>
      { loading&&user?.id?'loding': <div className='flex  items-center flex-col dark:text-white'>
   <div className='w-full sm:w-[560px]  '>
     <div className='flex  m-2 text-xl font-bold items-center text-ellipsis justify-between'>
     <h1 className='flex gap-2  items-center'>{newtitle[0].msg}-<Avatar  src={user?.image!}></Avatar></h1> 
     <div className='flex-2'>
     <Dalog  SetTitle={settitle} title={newtitle}    msg='更改你的信息,使他一目了然吧!' content='更改信息'>
     <GearIcon  className='text-2xl w-6 h-6 cursor-pointer  hover:text-violet-600 hover:rotate-180 transition-all duration-200 '></GearIcon>  
</Dalog>
     </div>
     </div> 
   <div>
   <div className=' text-center text-gray-600 m-1'>{newtitle[1].msg}</div>
   <div className="flex 
items-center md:items-start  md:justify-around flex-col
md:flex-row   flex-wrap  gap-3  ">

{ LinkListCardS.map((msg,index)=>(
 <motion.div 
 initial={{ opacity: 0 }}
variants={
{open: { opacity: 1, x: 0 },
 closed: { opacity: 0, x: "-100%" },}
  }
 whileInView={{ opacity: 1 }}
 whileHover={{scale:1.1}}
 layoutId={index.toString()} key={index} onClick={() => setSelectedId(index)}  >
  <Card    title={msg.title} createdAt={msg.createdAt} description={msg.description} image={msg.image} url={msg.url} Setlist={()=>SetSlice(index)}></Card>
</motion.div>
))}



</div>
{
 (!(session?.user.id===LinkCardGather?.userId!))?<>
 <div className='flex justify-around w-full mt-3'>

<button className='flex but-form items-center bg-blue-500 hover:shadow-gray-600 dark:hover:shadow-blue-500  shadow-md cursor-pointer' onClick={()=>RSS()}>
 <PhRssLight /> 订阅</button>
<button className='flex but-form items-center bg-blue-500 hover:shadow-gray-600 dark:hover:shadow-blue-500  shadow-md cursor-pointer' onClick={()=>copy(()=>{
  Setopentime('成功复制链接,分享链接即可',true)
})}><PhShare></PhShare>分享</button>
</div>
 </>:<>
 <div className="flex gap-1 w-50vw sm:gap-3 justify-center m-5">
 <input type="text" placeholder="https://github.com/" value={url}
 onChange={(e)=>{seturl(e.target.value)} 
}   
 className="p-2 no-underline 
  dark:placeholder-violet-200
  
 sm:w-80  w-64 border boder-black bg-white rounded-sm " name="" id="" />
     <button onClick={()=>a(url)} className=" but-form flex items-center text-nowrap text-sm  h-auto">
{/* {!link?'添加链接':'解析中-'} */}
 添加
     </button>
 </div>
<div className=' text-center text-gray-600 m-1'>邀请<Dalog title={spen} SetTitle={spenmsg} msg='输入你要邀请的共创者ID' content='邀请用户' ><button className=' text-blue-600 text-ellipsis m-1 underline'> 同好者 </button></Dalog> 共同参与完善这个合集</div>
<div className='flex justify-around w-full mt-3'>
<button className='but-form bg-blue-500 hover:shadow-gray-600 dark:hover:shadow-blue-500  shadow-md cursor-pointer' onClick={()=>updata()}>保存修改</button>
<button className='but-form bg-blue-500 hover:shadow-gray-600 dark:hover:shadow-blue-500  shadow-md cursor-pointer' onClick={()=>dlete()}>删除合集</button>
</div>
 </>
}

</div>
   </div>

</div>} 
    </div>

    )
}
