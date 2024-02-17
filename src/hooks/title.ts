//window.location.href
const copy=async (fn?:Function)=>{
  const url=window.location.href
 try {
  await navigator.clipboard.writeText(url);
  if (fn) {
    fn()
  }
 } catch (error) {
  throw new Error("复制失败")
 }
}
export {
  copy
}
