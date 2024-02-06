import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './style.css';
interface change{
  content:string
  msg:string
  title:string
  SetTitle:Function
}
const DialogDemo = ({content,title,SetTitle,msg}:change) => { 
  const [newtitle,Setnew]=React.useState(title)
return <Dialog.Root>
<Dialog.Trigger  asChild>
  <button className=" text-green-500  ">Edit {content}</button>
</Dialog.Trigger>
<Dialog.Portal>
  <Dialog.Overlay className="DialogOverlay" />
  <Dialog.Content className="DialogContent">
    <Dialog.Title className="DialogTitle">Edit {content}</Dialog.Title>
    <Dialog.Description className="DialogDescription">
     {msg}
    </Dialog.Description>
    <fieldset className="Fieldset">
      <label className="Label" htmlFor="username">
        new{content} 
      </label>
      <input className="Input" id="username" defaultValue="title" value={newtitle} onChange={e=>{
Setnew(e.target.value)
                  }}/>
    </fieldset>
    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
      <Dialog.Close asChild>
        <button className="Button green" onClick={()=>{SetTitle(newtitle)}}>Save changes</button>
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
