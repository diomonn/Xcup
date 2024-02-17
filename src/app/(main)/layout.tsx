
import type { Metadata } from 'next'

import Header from '@/components/header'
import Footer from '@/components/footer'
import '@radix-ui/themes/styles.css'; 


export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className=' bg-blue-300 dark:bg-black min-h-[100vh] text-black ' >
      <Header></Header>
    {children}
    <Footer></Footer>
    </div>
  )
}
