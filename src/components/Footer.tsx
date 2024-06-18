import Image from "next/image";
import Facebook from "@/components/svg/Facebook";
import Instagram from "@/components/svg/Instagram";
import Tiktok from "@/components/svg/Tiktok";
export default function Footer() {
  return <section className="bg-black font-Oswald400 md:h-auto">
    <div className="flex flex-col gap-4 w-full h-full pt-16 px-4 items-center md:flex-row md:pt-4 md:w-4/5 md:mx-auto">
      <Image
        src="/images/BakaLogo2.png"
        className="w-52"
        alt=""
        width={300}
        height={300} />
      <div className="flex w-full justify-around">
        <a href="http://instagram.com/_u/subway_barber_baka_style/">
          <Instagram />
        </a>
        <a href="https://www.facebook.com/p/Subway-barber-Baka-style-100040874181047">
          <Facebook />
        </a>
        <Tiktok />
      </div>
      <div className="w-full px-8">
        <p>
          <a className="text-Tan text-md underline w-full" href="#">
            Home
          </a>
        </p>
        <p>
          <a className="text-Tan text-md underline w-full" href="#prodotti">
            Prodotti
          </a>
        </p>
        <p>
          <a className="text-Tan text-md underline w-full" href="#servizi">
            Servizi
          </a>
        </p>
        <p>
          <a className="text-Tan text-md underline w-full" href="#contatti">
            Contatti
          </a>
        </p>
      </div>
      <div className="w-full px-8">
        <h4 className="text-md text-white">Orari</h4>
        <p className="text-white">Mar-Ven</p>
        <p className="text-white"> 8:15/13:00 - 15:00/20:15 </p>
      </div>
      <div className="w-full px-8">
        <h4 className="text-md text-white">Luogo</h4>
        <p className="text-white">Via San Camillo, 9</p>
        <p className="text-white"> Bucchianico </p>
      </div>
      <hr className="w-4/5 mx-auto md:hidden" />
      <p className="text-white md:hidden">&copy; 2024 Baka Style</p>
    </div>
    <hr className="w-4/5 mx-auto hidden md:block mt-4" />
    <p className="text-white text-center hidden mt-4 md:block">
      &copy; 2024 Baka Style
    </p>
  </section>;
}