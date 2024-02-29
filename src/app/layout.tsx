import type { Metadata } from 'next'
import './globals.css'
import '@radix-ui/themes/styles.css'; 
import  SessionProvider  from "@/components/SessionProvider"
import { getServerSession } from 'next-auth'
import Head from 'next/head'
  export const metadata: Metadata = {
    title: '贾雨竹(diamond)',
    authors:{
      name:'@diamond',
      url:'www.diamondqin.xyz'
    },
    icons:{
      icon:'https://th.bing.com/th/id/OIG4.T0X0ro2ldEptDFI17d6b?w=1024&h=1024&rs=1&pid=ImgDetMain'
    },
    assets:'https://th.bing.com/th/id/OIG4.T0X0ro2ldEptDFI17d6b?w=1024&h=1024&rs=1&pid=ImgDetMain',
    description: '在推荐算法统治的互联网上造出一个桥梁,打破信息茧房,让我们拥抱真正的互联网世界',
  }
export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session= await getServerSession()
  return (
    <html lang="en" className='dark:bg-black' >
      <meta name="renderer" content="webkit"/>
<meta name="referrer" content="never"></meta>
<Head> 
<link rel="shortcut icon"  href="/favicon.ico" />
 </Head>
      <body className='dark:bg-black'>
     <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
