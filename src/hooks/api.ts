import { LinkCardGather } from "@prisma/client"
import { promises } from "dns"

const url='http://localhost:3000/api/'
export const POSTCARD=async (ID:string)=>{
try{ const data= await fetch('http://localhost:3000/api/LinkCard',{
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
  try{ const data= await fetch(`http://localhost:3000/api/LinkCardGather/GETNAME`,{
    method:'GET',
  }).then(res=>res.json()) 
  console.log("GETNAME----------");  
  return data
}catch{
return 
}
}
export const PostCardList=async (title:string):Promise<LinkCardGather|void>=>{
  try{ const data= await fetch(`http://localhost:3000/api/LinkCardGather`,{
    method:'POST',
    body:JSON.stringify({title})
  }).then(res=>res.json())  
  return data
}catch{

}
}
