import CN from 'classnames'
export default function avatar({src,Size}:{src:string,Size:string}) {
  return <img src={src} 
  alt='avatar'
   className={ CN('rounded-full relative', Size==='XL'?"h-10 w-10":'w-10  h-10')}
  ></img>
}
