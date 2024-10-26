import AnimationOnScroll from "@/components/AnimateOnScroll";
import ButtonPrenota from "@/components/ButtonPrenota";
import EmblaCarousel from "@/components/EmblaCarousel";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RadioPlayer from "@/components/RadioPlayer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function Academy() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="overflow-hidden h-screen">
        <video
          loop
          muted
          autoPlay
          playsInline
          className="h-screen w-full object-cover"
          disablePictureInPicture={true}
          disable-picture-in-picture="true"
        >
          <source src="/videos/Bakademy4mb.mp4" type="video/mp4" />
        </video>
        <div className="absolute w-full h-screen top-0 left-0 bg-black/60"></div>
        <div className="w-full absolute top-48 text-center">
          <AnimationOnScroll
            delay={0}
            classNameInView="opacity-100"
            classNameNotInView="opacity-0 translate-y-10"
          >
            <p className="font-BlackOpsOne text-Tan/90 text-6xl">Bakademy</p>
            <p className="font-Oswald text-3xl text-white/75 mb-52">
              Impara le <span className="text-Tan">regole</span> e poi{" "}
              <span className="text-Tan">rompile!</span>
            </p>
          </AnimationOnScroll>
        </div>
      </div>
      <RadioPlayer />
      <section
        className="bg-black text-[#e1e1e1] font-Oswald md:h-screen flex flex-col"
        id="contatti"
      >
        {/* <div className="bg-1 hidden md:block md:h-3/5 md:shrink md:w-full"></div> */}
        <div className="max-w-screen-2xl mx-auto py-16">
          <AnimationOnScroll
            delay={0}
            classNameInView="opacity-100"
            classNameNotInView="opacity-0 translate-y-10"
          >
            <h1 className="title mb-8">Bakademy</h1>
            <div className="flex flex-col items-center gap-y-14 mb-8">
              <p className="mt-4 text-xl text-center lg:w-3/5 font-Oswald400">
                Benvenuto nella <span className="text-Tan">Bakademy</span>, dove{" "}
                <span className="text-Tan">passione</span> e
                <span className="text-Tan"> tecnica</span> si incontrano per
                formare i nuovi maestri dell&apos;arte della barberia. Attraverso
                corsi intensivi e pratici, apprenderete non solo le più avanzate
                tecniche di <span className="text-Tan">taglio</span> e{" "}
                <span className="text-Tan">rasatura</span>, ma anche il valore
                dell&apos;
                <span className="text-Tan">attenzione al dettaglio</span> e
                della <span className="text-Tan">creatività</span>. <br />
                <br /> Prepariamo ogni partecipante a diventare un
                professionista completo, capace di esprimere il proprio{" "}
                <span className="text-Tan">stile unico</span> e di affrontare
                con sicurezza le sfide di una carriera in continua evoluzione.
              </p>
              <ButtonPrenota classe="hidden md:block" />
            </div>
          </AnimationOnScroll>
          <div className="p-2 py-4 md:hidden">
            <EmblaCarousel
              slides={[
                "/images/Academy1.jpg",
                "/images/Academy3.jpg",
                "/images/Academy4.jpg",
                "/images/Academy2.jpg",
              ]}
              options={{ loop: true }}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
