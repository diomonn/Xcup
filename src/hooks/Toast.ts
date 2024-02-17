import * as react from 'react'
function useToast() {
  const [open, setOpen] = react.useState({
    open: false,
    msg: '',
    type: true
  });
  
  const Setopentime = (msg: string, type: boolean) => {
    let TIME
    setOpen({
      open: false,
      msg: '',
      type: true
    })
    clearTimeout(TIME)
    setOpen({
      open: true,
      msg,
      type
    })
    TIME = setTimeout(() => {
      setOpen({
        open: false,
        msg: '',
        type: true
      })
    }, 1000);
   
  }
  return {open, setOpen, Setopentime}
}
export default useToast
