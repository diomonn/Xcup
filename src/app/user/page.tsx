'use client'
import Image from 'next/image' 
import Link from 'next/link'
import * as Auth from 'next-auth/react'
const User=()=>{
  const {data:session,status,}=Auth.useSession()
 return <div>
  {/* {
    session ? <img src={session?.user?.image} alt="" /> 
  } */}

 </div>
}

export default User
