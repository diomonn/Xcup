import type { Metadata } from 'next'
// import {Zheng} from '@/style/fonts'
import Header from '@/components/header'
import Footer from '@/components/footer'
// import './globals.css'
import '@radix-ui/themes/styles.css'; 
// import  SessionProvider  from "@/components/SessionProvider"
import { getServerSession } from 'next-auth'
// import { Theme,ThemePanel } from '@radix-ui/themes';
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session= await getServerSession()
  return (
    <div className=' bg-blue-300 min-h-[100vh]' >
      <Header></Header>
    {children}
    <Footer></Footer>
    </div>
  )
}
