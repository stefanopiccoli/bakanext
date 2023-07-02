import '../assets/css/ServiziMetro.css'

export default function ServiziMetro() {
  return (
    <div className="w-96 md:w-2/3 mx-auto grid place-items-center h-full bg-metro translate-y-14 rotate-90 md:translate-y-44 md:rotate-0">
    <div className="linea">
      <div className="nodo left-[5%]">
        <div className="cerchio"></div>
         {/* <div className="taglio bg-yellow-500 rotate-[75deg] md:rotate-[120deg]"><span className="rotate-180 -top-7 right-0">Taglio - 1 &euro; </span></div> */}
        <div className="taglio2 bg-red-600"><span className="-top-7 left-8">Piega - 1 &euro;</span></div>
      </div>
      <div className="nodo left-[20%]">
        <div className="cerchio"></div>
         {/* <div className="taglio bg-purple-600"><span className="top-2 left-8 rotate-180 md:rotate-0">Barba - 1 &euro;</span></div> */}
        <div className="taglio2 bg-yellow-400"><span className="-top-8 left-4">Shampoo - 1 &euro;</span></div>
      </div>
      <div className="nodo left-[35%]">
        <div className="cerchio"></div>
         {/* <div className="taglio bg-purple-600"><span className="top-2 left-8 rotate-180 md:rotate-0">Barba - 1 &euro;</span></div> */}
        <div className="taglio2 bg-purple-600"><span className="-top-8 left-4">Shampoo - 1 &euro;</span></div>
      </div>
      <div className="nodo left-[50%]">
        <div className="cerchio"></div>
         {/* <div className="taglio bg-purple-600"><span className="top-2 left-8 rotate-180 md:rotate-0">Barba - 1 &euro;</span></div> */}
        <div className="taglio2 bg-white"><span className="-top-8 left-4">Shampoo - 1 &euro;</span></div>
      </div>
      <div className="nodo left-[65%]">
        <div className="cerchio"></div>
         {/* <div className="taglio bg-purple-600"><span className="top-2 left-8 rotate-180 md:rotate-0">Barba - 1 &euro;</span></div> */}
        <div className="taglio2 bg-sky-600"><span className="-top-8 left-4">Shampoo - 1 &euro;</span></div>
      </div>
      <div className="nodo left-[80%]">
        <div className="cerchio"></div>
         {/* <div className="taglio bg-purple-600"><span className="top-2 left-8 rotate-180 md:rotate-0">Barba - 1 &euro;</span></div> */}
        <div className="taglio2 bg-pink-600"><span className="-top-8 left-4">Shampoo - 1 &euro;</span></div>
      </div>
    </div>
  </div>
  )
}
