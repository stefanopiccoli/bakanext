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

export default async function ProductDescription({
  params,
}: {
  params: { name: string };
}) {
  const product_url = (name:string) => name.replace("-", " ");
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
    <div className="">
      <div className="w-full relative h-screen pb-12 font-Oswald text-white">
        <Image
          className="w-full h-72 sticky top-0 z-0"
          src={product.imageUrl}
          width="500"
          height="500"
          alt={""}
        ></Image>
        <div className="relative -top-10 z-10 bg-black overflow-hidden rounded-xl">
          <Breadcrumb className="pt-4 pl-4 hover:text-white">
            <BreadcrumbList className="font-Oswald300 text-white/80  text-xl">
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
          <div className="pl-4 pt-8 text-5xl uppercase text-Tan">
            {product.name}
          </div>
          <div className="pt-4 pl-5 text-2xl font-Oswald">
            {product.price.toFixed(2)} &euro;
          </div>
          <div className="pt-12 pl-4 font-Oswald300">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Laudantium, quaerat. Consequatur odio amet modi quas deleniti eaque
            illum delectus sed nesciunt! Quaerat doloremque quos quibusdam eaque
            sint explicabo pariatur asperiores.
          </div>
          <div className="pt-10 pl-4 font-Oswald300">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Laudantium, quaerat. Consequatur odio amet modi quas deleniti eaque
            illum delectus sed nesciunt! Quaerat doloremque quos quibusdam eaque
            sint explicabo pariatur asperiores.
          </div>
          <h5 className="pt-10 pl-4 font-Oswald300">VEDI ANCHE:</h5>
          <div className="flex flex-wrap px-6 gap-8 py-6 w-full justify-center">
            {products.map((product, index) =>
              rand.includes(index) ? (
                <a href={`/prodotti/${product.name.replace(" ","-")}`}>
                  <Image
                    className="w-24 h-24 object-cover object-center border-2 border-white"
                    src={product.imageUrl}
                    alt={""}
                    width={200}
                    height={200}
                    key={product.id}
                  ></Image>
                </a>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
