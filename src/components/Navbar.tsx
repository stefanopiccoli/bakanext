'use client';
import Image from 'next/image';
import ButtonPrenota from './ButtonPrenota';
import Instagram from './svg/Instagram';
import Facebook from './svg/Facebook';
import Tiktok from './svg/Tiktok';
import '../assets/css/Navbar.css'
import { useEffect, useState } from 'react';


export default function Navbar() {
  const [menu, setMenu] = useState<boolean>(false);
  
  const openMenu = () => {
    setMenu((status)=>!status)
  }
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    

  <nav
    className={"fixed z-10 top-0 h-16 md:h-20 w-full bg-black font-Oswald md:shadow-none md:block "+ (scrollTop > 280 ? "md:bg-black" : "md:bg-transparent")}
    >
    <div className="w-full h-full max-w-screen-2xl mx-auto px-3">
      <div
        className={"mobile md:text-xl text-white shadow-lg shadow-neutral-900 md:shadow-none md:flex md:justify-between md:items-center "+(menu ? "open-menu" : "")}
        id="mobile"
      >
        <div className="md:w-5/12 md:flex md:justify-around items-center">
          <li className="pb-16 list-none md:pb-0 md:inline-block">
            <a href="#prodotti" onClick={()=>openMenu()}>Prodotti</a>
          </li>
          <li className="pb-16 list-none md:pb-0 md:inline-block">
            <a href="#servizi" onClick={()=>openMenu()}>Servizi</a>
          </li>
          <li className="pb-16 list-none md:pb-0 md:inline-block">
            <a href="#contatti" onClick={()=>openMenu()}>Contatti</a>
          </li>
        </div>
        <a className="hidden md:inline-block" href="#"
          ><Image src="/images/BakaLogo2.png" className="h-20 w-auto py-1" width={300} height={300} alt={''} /></a>
        <ButtonPrenota classe="md:hidden" />
        <div className="social md:w-5/12 md:flex md:items-center md:justify-evenly">
          <span><Instagram /></span>
          <span><Facebook /></span>
          <span><Tiktok /></span>
          <ButtonPrenota classe="hidden md:inline-block" />
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-between md:hidden">
        <a className="md:hidden w-1/5" href="#"
          ><Image className="h-12" src="/images/BakaLogo2.png" width={300} height={300} alt={''} />
        </a>
        <span className="font-BlackOpsOne text-Tan/90 text-2xl ">Baka Style</span>
        <div className="md:hidden flex justify-end items-center w-1/5">
          <input className="hidden" id="toggle" type="checkbox" defaultChecked={menu} />
          <label className="hamburger" onClick={()=>openMenu()}>
            <div className="top-bun"></div>
            <div className="meat"></div>
            <div className="bottom-bun"></div>
          </label>
        </div>
      </div>
    </div>
  </nav>
  )
}
