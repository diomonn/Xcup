import { LinkCardGather } from "@prisma/client"
import { promises } from "dns"
import { User } from "next-auth"

const url='api/'
export const POSTCARD=async (ID:string)=>{
try{ const data= await fetch('api/LinkCard',{
    method:'POST',
    body:JSON.stringify({ID:ID})
  }).then(res=>res.json()) 
  return data
}catch{
return {
  msg:"没有找到"
}
}
}
export const GETNAME=async ():Promise<LinkCardGather[]|void>=>{
  try{ const data= await fetch(`api/LinkCardGather/GETNAME`,{
    method:'GET',
  }).then(res=>res.json()) 
  
  return data
}catch{
return 
}
}
export const PostCardList=async (title:string,description:string,open:boolean):Promise<LinkCardGather|void>=>{
  try{ const data= await fetch(`api/LinkCardGather`,{
    method:'POST',
    body:JSON.stringify({title,description,open})
  }).then(res=>res.json())  
  return data
}catch{
return
}
}
export const getmanyUser=async (Them:string[]):Promise<User[]>=>{
  const data= await fetch(`api/user/GET`,{
    method:'POST',
    body:JSON.stringify(Them)
  }).then(res=>res.json())  
  console.log(data);
  
  return data

}
