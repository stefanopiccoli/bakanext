import ButtonPrenota from "@/components/ButtonPrenota";
import CardProdotto from "@/components/CardProdotto";
import CardServizio from "@/components/CardServizio";
import Navbar from "@/components/Navbar";
import Facebook from "@/components/svg/Facebook";
import Instagram from "@/components/svg/Instagram";
import Tiktok from "@/components/svg/Tiktok";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types/product";
import { Service } from "@/types/service";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

export async function fetchProducts() {
  const products = (await getDocs(collection(db, "products"))).docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Product[];
  products.forEach((doc) => {
    console.log(doc);
  });
  return products;
}
export async function fetchServices() {
  const services = (await getDocs(collection(db, "services"))).docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Service[];
  services.forEach((doc) => {
    console.log(doc);
  });
  return services;
}

export default async function Home() {
  const products: Product[] = await fetchProducts();
  const services: Service[] = await fetchServices();
  console.log(products);

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
          <p className="font-BlackOpsOne text-Tan/90 text-6xl">Baka Style</p>
          <p className="font-Oswald text-3xl text-white/75 mb-52">
            Prossima fermata, lo stile
          </p>
          <ButtonPrenota />
        </div>
      </div>
      {/* <!-- LA METROPOLITANA --> */}
      <section
        className="bg-black text-[#e1e1e1] font-Oswald py-16"
        id="contatti"
      >
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="title mb-8">La metropolitana</h1>
          <div className="flex flex-col items-center gap-y-14 mb-8">
            <p className="mt-4 text-xl text-center lg:w-2/5 font-Oswald400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reiciendis laborum qui sit! Tempore expedita explicabo quas
              consectetur labore corrupti esse, hic harum odit rerum
              consequatur, asperiores ipsa iusto, laudantium temporibus.
            </p>
            <ButtonPrenota />
          </div>
          <hr className="w-4/5 mx-auto" />
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
          </div>
        </div>
      </section>
      {/* <!-- PRODOTTI --> */}
      <section className="font-Oswald" id="prodotti">
        <div className="bg-Prodotti py-16">
          <div className="max-w-screen-2xl mx-auto">
            <h1 className="title">Prodotti</h1>
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
      <section className="font-Oswald bg-Tan text-center py-16" id="servizi">
        <h1 className="text-center text-5xl text-black">Servizi</h1>
        <div className="grid grid-cols-1 py-16 gap-8">
          {services?.map((service) => (
            <CardServizio service={service} key={service.id} />
          ))}
        </div>
        {/* <ServiziMetro /> */}
        <div>
          <a
            href="https://www.iprenota.it/website/esercente/parrucchiere-uomo/bucchianico/ch/baka-style"
            target="_blank" rel="noreferrer"
          >
            <button className="bg-black font-Oswald400 w-32 h-14 text-lg text-Tan">
              Prenota ora
            </button>
          </a>
        </div>
      </section>
      <section className="bg-black h-screen font-Oswald400 lg:h-auto">
        <div className="flex flex-col gap-4 w-full h-full pt-16 px-4 items-center lg:flex-row lg:pt-0">
          <Image
            src="/images/BakaLogo2.png"
            className="w-64"
            alt=""
            width={300}
            height={300}
          />
          <div className="flex w-full justify-around">
            <Instagram />
            <Facebook />
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
          <p className="text-white lg:hidden">&copy; 2023 Baka Style</p>
        </div>
        <hr className="w-4/5 mx-auto hidden lg:block mt-4" />
        <p className="text-white text-center hidden mt-4 lg:block">&copy; 2023 Baka Style</p>
      </section>
    </div>
  );
}
