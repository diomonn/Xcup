// import second from 'next/'
import {NextApiRequest,NextApiResponse}  from 'next'
import  * as cheerio from 'cheerio'
import axios from 'axios'
const REGEXP={
 description :/(?<=description").*?(?=\/>)/,
 url :/(?<=="url").*?(?=>)/,
 image :/(?<=image").*?(?=>)/,
 title :/(?<=og:title").*?(?=>)/,
 title1 :/(?<=name="title").*?(?=>)/,
 title2 :/(?<=<title)(.*?)(?=<\/title>)/,
}
const Axios=axios.create({
  baseURL:'' ,
  timeout: 5000
})
function  isnull(str:string|undefined) {
  return str===''?null:str
}
 async function getForum(url:string) {
  try {
      const res = await Axios.get(
          url,{
            proxy:{
              host:"127.0.0.1",
              port:7890,
              protocol:"http"
            }
          }
      )
      
const $ = cheerio.load(res.data);
      return {
        title:isnull($('meta[property=twitter:title]').attr('content'))??isnull($('meta[property=og:title]').attr('content'))??$('title').text(),     
        description:isnull($('meta[name=description]').attr('content'))??isnull($('meta[property=og:description]').attr('content'))??$('meta[property=twitter:description]').attr('content'),
        image:$('meta[property=og:image]').attr('content')??$('meta[name=image]').attr('content'),
        url:$('meta[property=og:url]').attr('content')
      }
  } catch (error) {
      console.error(error)
  }
}


export default async function A(req:NextApiRequest,res:NextApiResponse){
  const {url}=await JSON.parse(req.body)   
 const a=await  getForum(url)
console.log(a);

  
 res.status(200).json(a)
}
