
import type { Metadata } from 'next'

import Header from '@/components/header'
import Footer from '@/components/footer'
import '@radix-ui/themes/styles.css'; 
import { ScrollArea } from '@radix-ui/themes';
export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ScrollArea type="always" scrollbars="vertical" >
      <div className=' bg-blue-300 dark:bg-black min-h-[100vh] text-black ' >
      <Header></Header>
    {children}
    
    </div>
      <Footer></Footer>
    </ScrollArea>
    
  )
}
