import {NextApiRequest,NextApiResponse} from 'next'
import RSS from 'rss'
import {LinkCardGather, PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
export async function GET(req:NextApiRequest,res:NextApiResponse) {
  const {id}=req.query
  // const feed = new RSS({
  //   title: '你的网站标题',
  //   description: '你的网站介绍',
  //   site_url: 'https://yourdomain.com', // 你的网站域名
  //   feed_url: 'https://yourdomain.com/feed.xml', // 尽可能用绝对 URL
  //   language: 'zh-CN', // 网站语言代码
  //   image_url: 'https://yourdomain.com/opengraph-image.png', // 放一个叫 opengraph-image.png 的1200x630尺寸的图片到你的 app 目录下即可
  //   generator: 'PHP 9.0', // 想写什么就写什么，也可以不提供
  // })
 
  
  // const data = await  await prisma.linkCardGather.findFirst(({
  //   where:{
  //     id:id as string
  //   },
  //   include:{
  //     LinkCard:true
  //   }
  // })) // 获取文章数据才能填充 RSS feed
  // // 假设 data 是一个类型为文章的数组：
  // data?.LinkCard.forEach((post) => {
  //   feed.item({
  //     title: post.title, // 文章名
  //     guid: post.id, // 文章 ID
  //     url: post.url, // 文章的链接
  //     description: post.description, // 文章的介绍，如果有的话
  //     date: new Date(post.createdAt), // 文章的发布时间
  //     enclosure: {
  //       url: post.image, // 文章的图片，如果有的话
  //     }
  //   })
  // })
 
  // return new Response(feed.xml(), {
  //   headers: {
  //     'content-type': 'application/xml'
  //   }
  // })
  return res.json({
    a:id,
    b:'2'
  })
}
