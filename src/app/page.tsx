import Image from 'next/image'
import Header from '@/components/header'
import Main from '@/components/main'
import Footer from '@/components/footer'
export default function Home() {
  return (

<main className='bg-blue-300 w-[100vw] h-[100vh]' >
 <Header></Header>
 <Main></Main>
 <Footer/>
 </main>
  )
}
