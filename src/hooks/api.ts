
export const POSTCARD=async (ID:string)=>{
try{ const data= await fetch('http://localhost:3000/api/LinkCard',{
    method:'POST',
    body:JSON.stringify({ID:ID})
  }).then(res=>res.json) 
  return data
}catch{
return {
  msg:"没有找到"
}
}
  
}
