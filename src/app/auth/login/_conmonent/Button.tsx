/* eslint-disable react/display-name */
import Link from 'next/link'
import * as React from 'react'
import {motion, useMotionValue, useTransform,Reorder} from 'framer-motion'
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%",y:"30%" },
}
const Items=()=>{
  const a=[1,2,3]
  
  return <div className='w-20 h-20 border border-black'> 112930</div>
}
export const MyComponent = () => (
  <motion.div
  className='w-20 h-20 bg-black' 
  
  />
)
export default function Button({text}:{text:string}){
const [isOpen,setIsOpen]=React.useState(true)
const [a,seta]=React.useState([1,2])
  return <div>
<MyComponent/>
<motion.circle
className='w-20 h-20 border border-darkthemeColor'
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 3 }}
/>
     
   
  </div>
}
