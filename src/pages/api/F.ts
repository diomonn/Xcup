// import second from 'next/'
import {NextApiRequest,NextApiResponse}  from 'next'
import  * as cheerio from 'cheerio'
import axios from 'axios'
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
  console.log($('title').text());
      return {
        title:isnull($('title').text())??isnull($('meta[property=twitter:title]').attr('content'))??isnull($('meta[property=og:title]').attr('content')),     
        description:isnull($('meta[name=description]').attr('content'))??isnull($('meta[property=og:description]').attr('content'))??$('meta[property=twitter:description]').attr('content'),
        image:$('meta[property=og:image]').attr('content')??$('meta[name=image]').attr('content'),
        url:url
      }
  } catch (error) {
      console.error(error)
  }
}


export default async function A(req:NextApiRequest,res:NextApiResponse){
  const {url}=await JSON.parse(req.body) 
  
  
 const a=await  getForum(url)

  
 res.status(200).json(a)
}
