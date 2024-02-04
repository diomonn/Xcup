import { ReactComponentElement, ReactElement } from "react";

export default function Suspense({children}:{children:ReactElement}){
   return <>
   {children}
   </>
}
