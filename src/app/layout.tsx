import type { Metadata } from 'next'
import './globals.css'
import '@radix-ui/themes/styles.css'; 
import  SessionProvider  from "@/components/SessionProvider"
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: '贾雨竹(diamond)',

  description: '在推荐算法统治的互联网上造出一个桥梁,打破信息茧房,让我们拥抱真正的互联网世界',
}
export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session= await getServerSession()
  return (
    <html lang="en" >
      <meta name="renderer" content="webkit"/>
<meta name="referrer" content="never"></meta>
      <body >
        
     <SessionProvider session={session}>{children}</SessionProvider>
   
      </body>
    </html>
  )
}
