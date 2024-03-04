'use client'; 
import { PropsWithChildren, useEffect, useState } from "react";

  
export default function HideOnScroll({children}:PropsWithChildren) {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);    
    
    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.scrollY;
          const isVisible = prevScrollPos > currentScrollPos;
    
          setPrevScrollPos(currentScrollPos);
          setVisible(isVisible);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [prevScrollPos]);

    return (
        <nav className={`border-gray-200 fixed top-0 left-0 right-0 shadow-lg ${visible ? '': 'hidden'} z-10 bg-dark-bg-color`}>
          {children}
        </nav>
    );
}