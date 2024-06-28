import { db } from "@/lib/firebase/config";
import { Product } from "@/types/product";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function ProductDescription({
  params,
}: {
  params: { name: string };
}) {
  const product_url = (name: string) => name.replace("-", " ");
  const citiesRef = collection(db, "products");
  const q = query(citiesRef, where("name", "==", product_url(params.name)));
  var product!: Product;
  (await getDocs(q)).forEach((doc) => {
    product = {
      id: doc.id,
      ...doc.data(),
    } as Product;
  });

  async function fetchProducts() {
    const products = (await getDocs(collection(db, "products"))).docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Product[];
    return products;
  }
  const products = await fetchProducts();
  var rand: number[] = [];
  while (rand.length < 3) {
    var r = Math.floor(Math.random() * products.length);
    if (rand.indexOf(r) === -1) rand.push(r);
  }
  if (!product) return <div>Prodotto non trovato</div>;
  return (
    <div className="bg-black md:pt-24">
      <Navbar transparent={false} />
      <div className="w-full relative h-[75vh] pb-12 font-Oswald text-white">
        <Image
          className="w-full h-72 sticky top-12 z-0 md:row-span-3 object-cover object-center md:hidden"
          src={product.imageUrl}
          width="500"
          height="500"
          alt={""}
        ></Image>
        <div className="relative z-10 bg-black overflow-hidden md:top-0 md:rounded-none md:grid md:grid-cols-2">
          <Image
            className="hidden w-full h-72 z-0 md:row-span-4 object-cover object-center md:block md:self-center md:h-full"
            src={product.imageUrl}
            width="500"
            height="500"
            alt={""}
          ></Image>
          <Breadcrumb className="pt-4 pl-4 hover:text-white md:pt-0 md:pb-4">
            <BreadcrumbList className="font-Oswald300 text-white/80 text-xl">
              <BreadcrumbItem>
                <BreadcrumbLink className="hover:text-white" href="/">
                  HOME
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <span className="text-2xl">/</span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="hover:text-white" href="/#prodotti">
                  Prodotti
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <span className="text-2xl">/</span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="hover:text-white" href="#">
                  {product.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="pl-4 pt-8 text-5xl uppercase text-Tan md:pt-0 md:self-center">
            {product.name}
          </div>
          <div className="pt-4 pl-5 text-2xl font-Oswald md:self-start md:pt-0">
            {product.price.toFixed(2)} &euro;
          </div>
          <div className="md:h-56">
            <p className="pt-12 pl-4 font-Oswald300 md:pt-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, quaerat. Consequatur odio amet modi quas deleniti
              eaque illum delectus sed nesciunt! Quaerat doloremque quos
              quibusdam eaque sint explicabo pariatur asperiores.
            </p>
            <p className="pt-10 pl-4 font-Oswald300 md:pt-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, quaerat. Consequatur odio amet modi quas deleniti
              eaque illum delectus sed nesciunt! Quaerat doloremque quos
              quibusdam eaque sint explicabo pariatur asperiores.
            </p>
          </div>
          <h5 className="pt-10 pl-4 font-Oswald300 col-span-2 md:hidden">
            Correlati:
          </h5>
          <div className="flex flex-wrap px-6 gap-8 py-6 w-full justify-center md:col-span-2 md:gap-32">
            {products.map((product, index) =>
              rand.includes(index) ? (
                <a
                  href={`/prodotti/${product.name.replace(" ", "-")}`}
                  key={product.id}
                  className="md:hidden"
                >
                  <Image
                    className="w-24 h-24 object-cover object-center border-2 opacity-50 border-white md:w-40 md:h-40 "
                    src={product.imageUrl}
                    alt={""}
                    width={200}
                    height={200}
                  ></Image>
                </a>
              ) : null
            )}
          </div>
        </div>
      </div>
      <section className="hidden md:block">
        <Footer />
      </section>
    </div>
  );
}
