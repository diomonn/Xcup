import React, { Children, ReactNode, useState } from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
import {Dialog} from '@radix-ui/themes'
import { Cross2Icon } from '@radix-ui/react-icons';
import './style.css';
import * as Switch from '@radix-ui/react-switch';
import { Props } from 'ahooks/lib/useControllableValue';
import { json } from 'stream/consumers';
import { Button, Flex, TextField } from '@radix-ui/themes';
interface Msgtitle {
  msg: string | boolean,
  name: string,
  open?: boolean
}
const DialogDemo=({children,title,SetTitle,content,msg}:{children: React.ReactNode,title:Msgtitle[],SetTitle:any,content:string,msg:string})=>{
  const [newtitle, Setnew] = React.useState<Msgtitle[]>(title)
  const Setnewmsg = (msg: string | boolean, i: number) => {
    
    Setnew(
      newtitle.map((el, index) => {
        if (i === index && typeof el.msg === 'string') {
          console.log(msg);
          el.msg=msg
        } else  if (i === index && typeof el.open === 'boolean') {
          el.open = !el.open
        }
        return el
      })
    )
    console.log(newtitle);
    
  }
  return <Dialog.Root>
  <Dialog.Trigger>
     {children}
  </Dialog.Trigger>
  <Dialog.Content style={{ maxWidth: 450 }}>
    <Dialog.Title>{content}</Dialog.Title>
    <Dialog.Description size="2" mb="4">
      {msg}
    </Dialog.Description>

    <Flex direction="column" gap="3">
      {newtitle.map((el,index)=>{
        return <label key={index}>
       { (typeof el.msg==='boolean')?<Switch.Root className="SwitchRoot" checked={el.open}
                onCheckedChange={e => Setnewmsg(e.valueOf(), index)}
                id={index.toString()}>
                <Switch.Thumb className="SwitchThumb" />
              </Switch.Root> :<div>
       <div className='text-black dark:text-violet-600' >
          {el.name}
        </div>
        <TextField.Input
          onChange={e=>{Setnewmsg(e.target.value,index)}}
          placeholder={el.msg}
        />
       </div> }
        </label>
      })}
      
    </Flex>

    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button variant="soft" color="gray">
          取消
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button className='text-black dark:text-red-50' onClick={() => { SetTitle(newtitle) }}>确认</Button>
      </Dialog.Close>
    </Flex>
  </Dialog.Content>
</Dialog.Root>
}

export default DialogDemo;
