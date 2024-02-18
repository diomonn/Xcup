import * as Toast from '@radix-ui/react-toast';
import classNames from 'classnames';
import * as React from 'react'
function oneWeekAway(date?:any) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date:any) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}
// interface 
export default function name({open,setOpen,type,msg}:{open:boolean,setOpen:Function,type:boolean,msg:string}) {
  return   <Toast.Provider swipeDirection="right">
  <Toast.Root className="min-w-20 w-64  fixed  z-50  right-5  flex flex-col bottom-5  bg-white dark:bg-violet-500 rounded-md shadow-black drop-shadow-sm shadow-sm p-2" open={open} onOpenChange={()=>setOpen}>
    <Toast.Title className={classNames('text-xl text-ellipsis',type?'text-green-600':'text-red-600')}>
      {type?'成功':'失败'}
    </Toast.Title>
    <Toast.Description asChild>
      <h1>{msg}</h1>
    </Toast.Description>
  </Toast.Root>
  <Toast.Viewport className="ToastViewport" />
</Toast.Provider>
}
