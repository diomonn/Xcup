import Axios from 'axios'
const http=async (url:string)=>{
 Axios({
  url:url,
  method:"get",
  proxy:{
    host:"127.0.0.1",
    port:7890,
    protocol:"http"
  }
 }).then(res=>{
var description = /(?<=name="description" ).*?(?=>)/
var pattern1 = /(?<="name=url" ).*?(?=\/>)/
var pattern2 = /(?<=name=image" ).*?(?=\/>)/
console.log(res.data.match(description));
console.log(res.data.match(pattern2)[0]);
console.log(res.data.match(pattern1)[0]);
})
}
export default http




