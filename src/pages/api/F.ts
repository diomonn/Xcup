// import second from 'next/'
import {NextApiRequest,NextApiResponse}  from 'next'
import  * as cheerio from 'cheerio'

function  isnull(str:string|undefined) {
  return str===''?null:str
}
async function getForum(url:string) {
  try {
      const res = await fetch(url).then(res=>res.text())
      
      const $ = cheerio.load(res);
      return $('title').text()
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
 if (a) {
 res.status(200).json(a)
 }    else {  
  res.status(404).json({
    ok:a,
    msg:`网站禁止解析或者无法找到`
  })
 }
}
