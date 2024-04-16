'use client'
import Listcard from '../new/_components/Listcard'
import {useSession} from 'next-auth/react'
import {redirect} from 'next/navigation'
export default function Home() {
  const {data,status}=useSession()
  // if (status==='unauthenticated') {
  //   redirect('/api/auth/signin')
  // }else if(status=='loading'){
  //   return <div>等待身份验证</div>
  // }else {
   return (
     <Listcard bol={true} />
    )
  // }
}
