"use client";

import { useEffect, useState } from "react";
import {MaterialSymbolsModeNightOutlineRounded,MaterialSymbolsSunnyOutline} from '@/Svg/index'


 const DarkModeBtn = () => {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const root = window.document.documentElement;
    const initialIsDark = localStorage.getItem("isDarkMode") === "true";
    setIsDark(initialIsDark);
    root.classList.toggle("dark", !initialIsDark);
    
  },[]);
  const toggleDark=(event?: MouseEvent|any) =>{
    console.log(event);
    
    // @ts-expect-error experimental API
      const isAppearanceTransition = document.startViewTransition
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!isAppearanceTransition) {
        setIsDark(!isDark)
        handleThemeChange()
      isDark
        return
      }
      const x = event.clientX
      const y = event.clientY
      console.log(x,y);
      
      //获得网页大小
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )
      //结束时的大小
      // @ts-expect-error: Transition API
      const transition = document.startViewTransition(async () => {
        setIsDark(!isDark) 
        handleThemeChange()
        
      })
      
      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ]
          document.documentElement.animate(
            {
              clipPath: isDark
                ? [...clipPath].reverse()
                : clipPath,
              
            },
            {
              duration: 300,
              easing: 'ease-out',
              pseudoElement: isDark
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)',
            },
          )

        })
  }
  const handleThemeChange = () => {
    const root = window.document.documentElement;
    const newIsDark = !isDark;
    root.classList.toggle("dark", isDark);
    toggleDark
    setIsDark(newIsDark);
    localStorage.setItem("isDarkMode", String(newIsDark));
  };
  return (
    <div
      onClick={(e)=>toggleDark(e)}
    >
      {isDark ?  <MaterialSymbolsSunnyOutline
      className="w-6   h-6"
      ></MaterialSymbolsSunnyOutline>: <MaterialSymbolsModeNightOutlineRounded
      className="w-6 h-6"
      ></MaterialSymbolsModeNightOutlineRounded>
      }
    </div>
  );
};
export default DarkModeBtn
