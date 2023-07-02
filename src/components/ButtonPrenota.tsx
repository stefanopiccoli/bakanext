import React from "react";

export default function ButtonPrenota({classe} : {classe?:string}) {
  return (
    <div className={classe}>
      <a
        href="https://www.iprenota.it/website/esercente/parrucchiere-uomo/bucchianico/ch/baka-style"
        target="_blank"
      >
        <button className="bg-Tan font-Oswald w-32 h-14 text-lg text-black">
          Prenota ora
        </button>
      </a>
    </div>
  );
}
