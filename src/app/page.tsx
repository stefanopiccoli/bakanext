import AnimationOnScroll from "@/components/AnimateOnScroll";
import ButtonPrenota from "@/components/ButtonPrenota";
import CardProdotto from "@/components/CardProdotto";
import CardServizio from "@/components/CardServizio";
import EmblaCarousel from "@/components/EmblaCarousel";
import Navbar from "@/components/Navbar";
import RadioPlayer from "@/components/RadioPlayer";
import ReservationCarousel from "@/components/ReservationCarousel";
import Facebook from "@/components/svg/Facebook";
import Instagram from "@/components/svg/Instagram";
import Tiktok from "@/components/svg/Tiktok";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types/product";
import { Service } from "@/types/service";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

export const revalidate = 0;
async function fetchProducts() {
  const products = (await getDocs(collection(db, "products"))).docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Product[];
  return products;
}
async function fetchServices() {
  const services = (await getDocs(collection(db, "services"))).docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Service[];
  return services;
}

export default async function Home() {
  const products: Product[] = await fetchProducts();
  const services: Service[] = await fetchServices();

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
          <source src="/videos/Hero4mb.mp4" type="video/mp4" />
        </video>
        <div className="absolute w-full h-screen top-0 left-0 bg-black/60"></div>
        <div className="w-full absolute top-48 text-center">
          <AnimationOnScroll
            delay={0}
            classNameInView="opacity-100"
            classNameNotInView="opacity-0 translate-y-10"
          >
            <p className="font-BlackOpsOne text-Tan/90 text-6xl">Baka Style</p>
            <p className="font-Oswald text-3xl text-white/75 mb-52">
              Prossima fermata: lo stile!
            </p>
          </AnimationOnScroll>
          <ButtonPrenota />
        </div>
      </div>

      <RadioPlayer />
      {/* <!-- LA METROPOLITANA --> */}
      <section
        className="bg-black text-[#e1e1e1] font-Oswald md:h-screen flex flex-col"
        id="contatti"
      >
        <div className="bg-1 hidden md:block md:h-3/5 md:shrink md:w-full"></div>
        <div className="max-w-screen-2xl mx-auto py-16">
          <AnimationOnScroll
            delay={0}
            classNameInView="opacity-100"
            classNameNotInView="opacity-0 translate-y-10"
          >
            <h1 className="title mb-8">La metropolitana</h1>
            <div className="flex flex-col items-center gap-y-14 mb-8">
              <p className="mt-4 text-xl text-center lg:w-3/5 font-Oswald400">
                Benvenuti a bordo di Subway Barber, un salone unico nel suo
                genere che trae ispirazione dall&apos;<span className="text-Tan">energia</span> e dalla <span className="text-Tan">diversità</span> della
                metropolitana. 
                <br />
                Subway Barber non è solo uno spazio per la bellezza, ma una <span className="text-Tan">filosofia di lavoro</span> che celebra l&apos;<span className="text-Tan">unicità del cliente</span>, offrendo un&apos;<span className="text-Tan">esperienza</span> di bellezza su misura e
                inclusiva.
              </p>
              <ButtonPrenota classe="hidden md:block" />
            </div>
          </AnimationOnScroll>
          <div className="p-2 py-4 md:hidden">
            <EmblaCarousel
              slides={[
                "/images/Locale5.jpg",
                "/images/Locale6.jpg",
                "/images/Locale7.jpg",
                "/images/Locale8.jpg",
              ]}
              options={{ loop: true }}
            />
          </div>
          <hr className="w-11/12 mx-auto hidden md:block" />
          <AnimationOnScroll
            delay={0}
            classNameInView="opacity-100"
            classNameNotInView="opacity-0 translate-y-10"
          >
            <div className="mt-5 text-2xl grid gap-y-10 grid-cols-1 md:grid-cols-3 justify-items-center">
              <div className="text-center font-Oswald300">
                Martedì-Venerdì
                <br />
                8:15-13:00 / 15:00-20:15
              </div>
              <div className="text-center font-Oswald300">
                331-6281062
                <br />
                bakapr1976@hotmail.it
              </div>
              <div className="text-center font-Oswald300">
                Via San Camillo, 9
                <br />
                Bucchianico
              </div>
              <ButtonPrenota classe="md:hidden" />
            </div>
          </AnimationOnScroll>
        </div>
      </section>
      {/* <!-- SERVIZI --> */}
      <section className="font-Oswald bg-Tan text-center py-16" id="servizi">
        <AnimationOnScroll
          delay={0}
          classNameInView="opacity-100"
          classNameNotInView="opacity-0 translate-y-10"
        >
          <h1 className="text-center text-5xl text-black">Servizi</h1>
        </AnimationOnScroll>
        <div className="grid grid-cols-1 py-16 gap-8">
          {services?.map((service) => (
            <CardServizio service={service} key={service.id} />
          ))}
        </div>
        {/* <ServiziMetro /> */}
        <AnimationOnScroll
          delay={0}
          classNameInView="opacity-100"
          classNameNotInView="opacity-0 translate-y-10"
        >
          <div>
            <a
              href="https://www.iprenota.it/website/esercente/parrucchiere-uomo/bucchianico/ch/baka-style"
              target="_blank"
              rel="noreferrer"
            >
              {/* <button className="bg-black font-Oswald400 w-32 h-14 text-lg text-Tan">
                Prenota ora
              </button> */}
            </a>
          </div>
        </AnimationOnScroll>
      </section>
      <ReservationCarousel />
      {/* <!-- PRODOTTI --> */}
      <section className="font-Oswald" id="prodotti">
        <div className="bg-Prodotti py-16">
          <div className="max-w-screen-lg mx-auto">
            <AnimationOnScroll
              delay={0}
              classNameInView="opacity-100"
              classNameNotInView="opacity-0 translate-y-10"
            >
              <h1 className="title">Prodotti</h1>
            </AnimationOnScroll>
            <div className="flex flex-wrap justify-center mt-12 gap-8">
              {/* <CardProdotto
                title="Wall Street Pomade"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, nesciunt."
              />
              <CardProdotto
                title="Wall Street Pomade"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, nesciunt."
              />
              <CardProdotto
                title="Wall Street Pomade"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, nesciunt."
              />
              <CardProdotto
                title="Wall Street Pomade"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, nesciunt."
              />
              <CardProdotto
                title="Wall Street Pomade"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, nesciunt."
              /> */}
              {products?.map((product) => (
                <CardProdotto
                  name={product.name}
                  description={product.description}
                  key={product.id}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="font-Oswald" id="prodotti">
        <div className="bg-black py-16">
          <div className="max-w-screen-lg mx-auto">
            <AnimationOnScroll
              delay={0}
              classNameInView="opacity-100"
              classNameNotInView="opacity-0 translate-y-10"
            >
              <h1 className="title">
                Angolo <span className="text-Tan">Bar</span>-ber
              </h1>
            </AnimationOnScroll>
            <div className="w-full flex flex-col justify-center mt-10 px-4 gap-4">
              <div className="text-white text-center font-Oswald300">
                Goditi il nostro esclusivo angolo bar, dove la tua esperienza di
                taglio si trasforma in un momento di{" "}
                <span className="text-Tan font-bold">relax</span>. Dopo il
                trattamento, goditi una pausa con la nostra selezione di{" "}
                <span className="text-Tan font-bold">bevande esclusive</span>.
                Un tocco di gusto e raffinatezza per completare il tuo nuovo
                look con un sorriso.
              </div>
              {/* <Image src="/images/AngoloBar1.jpg" width={500} height={500} alt={""} /> */}
              <div className="sm:hidden">
                <EmblaCarousel
                  slides={["/images/AngoloBar1.jpg", "/images/AngoloBar2.jpg"]}
                  options={{ loop: true }}
                />
              </div>
              <Image
                className="hidden sm:block max-h-[34rem] object-cover object-bottom"
                src="/images/AngoloBar3.jpg"
                alt=""
                width={1900}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black font-Oswald400 lg:h-auto">
        <div className="flex flex-col gap-4 w-full h-full pt-16 px-4 items-center lg:flex-row lg:pt-4 lg:w-4/5 lg:mx-auto">
          <Image
            src="/images/BakaLogo2.png"
            className="w-52"
            alt=""
            width={300}
            height={300}
          />
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
              <a className="text-Tan text-lg underline w-full" href="#">
                Home
              </a>
            </p>
            <p>
              <a className="text-Tan text-lg underline w-full" href="#prodotti">
                Prodotti
              </a>
            </p>
            <p>
              <a className="text-Tan text-lg underline w-full" href="#servizi">
                Servizi
              </a>
            </p>
            <p>
              <a className="text-Tan text-lg underline w-full" href="#contatti">
                Contatti
              </a>
            </p>
          </div>
          <div className="w-full px-8">
            <h4 className="text-lg text-white">Orari</h4>
            <p className="text-white">Mar-Ven</p>
            <p className="text-white"> 8:15/13:00 - 15:00/20:15 </p>
          </div>
          <div className="w-full px-8">
            <h4 className="text-lg text-white">Luogo</h4>
            <p className="text-white">Via San Camillo, 9</p>
            <p className="text-white"> Bucchianico </p>
          </div>
          <hr className="w-4/5 mx-auto lg:hidden" />
          <p className="text-white lg:hidden">&copy; 2024 Baka Style</p>
        </div>
        <hr className="w-4/5 mx-auto hidden lg:block mt-4" />
        <p className="text-white text-center hidden mt-4 lg:block">
          &copy; 2024 Baka Style
        </p>
      </section>
    </div>
  );
}
