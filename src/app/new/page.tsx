import Header from '@/components/header'
import Cn from 'classnames'
const LinklistCard=()=>{
  const a=[1,2,3,4,5]
  return <div className=''>
<div className={Cn({'dd':`${1}`})}></div>
    {
      a.map((e,index)=>{
        return <div key={index} className={Cn({' absolute   w-52 h-72 border-black border ':true,
        'mt-2 ml-2 z-9':index===1,
        '-mt-4 -ml-4 z-8':index===2,
        '-mt-6 -ml-6 z-7':index===3,
        'bg-black border-red-50':index!==0,
        'bg-slate-100 z-10 ':index===0 

        })}>
             <div>一个合集</div>
             <div className=''>card</div>
        </div>
      })
    }

  
  </div>
} 
export default function Home() {
  return (
 <main>
<Header/>
 <LinklistCard/>
 </main>
  )
}
