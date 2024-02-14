import React, { Children, ReactNode, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './style.css';
import * as Switch from '@radix-ui/react-switch';
import { Props } from 'ahooks/lib/useControllableValue';
import { json } from 'stream/consumers';
interface Msgtitle{
  msg:string|boolean,
  name:string,
  open?:boolean
}

const DialogDemo = ({content,title,SetTitle,msg}:Props) => { 
  
  const [newtitle,Setnew]=React.useState<Msgtitle[]>(title)
 
  const Setnewmsg=(msg:string|boolean,i:number)=>{
    Setnew(
      newtitle.map((el,index)=>{
        if (i===index&&typeof el.msg==='string') {
          el.msg=msg
        }else if(i===index&&typeof el.open==='boolean'){
          console.log(msg);
          
          el.open=!el.open
        }
        return el
      })
    )
    console.log(newtitle);
    
  }
return <Dialog.Root>
<Dialog.Trigger  asChild>
  <button className=" text-green-500  ">编辑 {content}</button>
</Dialog.Trigger>
<Dialog.Portal>
  <Dialog.Overlay className="DialogOverlay" />
  <Dialog.Content className="DialogContent">
    <Dialog.Title className="DialogTitle">{content}</Dialog.Title>
    <Dialog.Description className="DialogDescription">
     {msg}
    </Dialog.Description>
    {
      newtitle.map((el: Msgtitle,index:number)=>{
return <fieldset className="Fieldset" key={index}>
<label className="Label" htmlFor={index.toString()}> {newtitle[index].name} </label>
{typeof el.msg==='boolean'?<Switch.Root className="SwitchRoot" checked={el.open}
onCheckedChange={e=>Setnewmsg(e.valueOf(),index)}
id={index.toString()}>
        <Switch.Thumb className="SwitchThumb"  />
      </Switch.Root>:
<input className="Input" id={index.toString()} defaultValue="title" value={el.msg} onChange={e=>{
Setnewmsg(e.target.value,index)
}}/>}

</fieldset>
      })
    }
    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
      <Dialog.Close asChild>
        <button className="Button green" onClick={()=>{SetTitle(newtitle)}}>保存修改</button>
      </Dialog.Close>
    </div>
    <Dialog.Close asChild>
      <button className="IconButton" aria-label="Close">
        <Cross2Icon />
      </button>
    </Dialog.Close>
  </Dialog.Content>
</Dialog.Portal>
</Dialog.Root>
};

export default DialogDemo;
