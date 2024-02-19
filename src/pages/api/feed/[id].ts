import {NextApiRequest,NextApiResponse} from 'next'
import RSS from 'rss'
import {LinkCardGather, PrismaClient} from '@prisma/client'
const prisma=new PrismaClient()
export default async function GET(req:NextApiRequest,res:NextApiResponse) {
  const {id}=req.query
  const feed = new RSS({
    title: '贾雨竹(diamond)',
    description: '梦想打破推荐算法带来的信息茧房,让每个人可以自由的拥抱互联网',
    site_url: 'https://www.diamondqin.xyz', // 你的网站域名
    feed_url: `https://www.diamondqin.xyz/feed/${id}`, // 尽可能用绝对 URL
    language: 'zh-CN', // 网站语言代码
    image_url: 'https://yourdomain.com/opengraph-image.png', // 放一个叫 opengraph-image.png 的1200x630尺寸的图片到你的 app 目录下即可
    generator: 'PHP 9.0', // 想写什么就写什么，也可以不提供
  })
 
  
  const data = await  await prisma.linkCardGather.findFirst(({
    where:{
      id:id as string
    },
    include:{
      LinkCard:true
    }
  })).then(res=>{
    console.log(res);
    return res?.LinkCard
  }) // 获取文章数据才能填充 RSS feed
  // 假设 data 是一个类型为文章的数组：
  if (data) {
    console.log(data);
    
    data.forEach((post) => {
      feed.item({
        title: post.title, // 文章名
        guid: post.id, // 文章 ID
        url: post.url, // 文章的链接
        description: post.description, // 文章的介绍，如果有的话
        date: new Date(post.createdAt), // 文章的发布时间
        enclosure: {
          url: post.image, // 文章的图片，如果有的话
        }
      })
    })
  }
  // req.body(feed.xml())
 res.setHeader('content-type','application/xml')
 res.status(200).send(feed.xml()) 
}
