import ButtonPrenota from "@/components/ButtonPrenota";
import CardProdotto from "@/components/CardProdotto";
import Navbar from "@/components/Navbar";
import { Product } from "./api/products/route";

export async function fetchProducts() {
  try {
    const res = await fetch("http://127.0.0.1:1337/api/products?populate=*", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const message = await res.json();
    console.log(message.data);

    return message.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const products: Product[] = await fetchProducts();
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
      <section className="bg-black text-[#e1e1e1] font-Oswald">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="title">La metropolitana</h1>
          <div className="flex flex-col items-center gap-y-14 mb-8">
            <p className="mt-4 text-xl text-center lg:w-2/5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reiciendis laborum qui sit! Tempore expedita explicabo quas
              consectetur labore corrupti esse, hic harum odit rerum
              consequatur, asperiores ipsa iusto, laudantium temporibus.
            </p>
            <ButtonPrenota />
          </div>
          <hr className="w-4/5 mx-auto" />
          <div className="mt-5 pb-20 text-2xl grid gap-y-10 grid-cols-1 md:grid-cols-3 justify-items-center">
            <div className="text-center">
              Martedì-Venerdì
              <br />
              8:15-13:00 / 15:00-20:15
            </div>
            <div className="text-center">
              331-6281062
              <br />
              bakapr1976@hotmail.it
            </div>
            <div className="text-center">
              Via San Camillo, 9
              <br />
              Bucchianico
            </div>
          </div>
        </div>
      </section>
      {/* <!-- PRODOTTI --> */}
      <section className="font-Oswald" id="prodotti">
        <div className="bg-Prodotti py-6">
          <div className="max-w-screen-2xl mx-auto">
            <h1 className="title">Prodotti</h1>
            <div className="flex flex-initial flex-wrap justify-center mt-8 gap-8">
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
                  name={product.attributes.name}
                  description={product.attributes.description}
                  key={product.id}
                  imageUrl={product.attributes.picture.data.attributes.url}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="font-Oswald bg-black text-center h-96">
        <h1 className="title">Servizi</h1>
        {/* <ServiziMetro /> */}
      </section>
    </div>
  );
}
