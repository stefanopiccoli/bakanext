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
  const citiesRef = collection(db, "products");
  const q = query(citiesRef, where("name", "==", params.name));
  var product!: Product;
  (await getDocs(q)).forEach((doc) => {
    product = {
      id: doc.id,
      ...doc.data(),
    } as Product;
  });
  if (!product) return <div>Prodotto non trovato</div>;
  return (
    <div className="h-[3000px] bg-black">
      <div className="w-full relative bg-black h-screen pb-12 font-Oswald text-white">
        <Image
          className="w-full h-72 sticky top-0 z-0"
          src={product.imageUrl}
          width="500"
          height="500"
          alt={""}
        ></Image>
        <div className="relative z-10 bg-black">
          <Breadcrumb className="pt-4 pl-4">
            <BreadcrumbList className="font-Oswald300 text-white/80 text-xl">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">HOME</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Prodotti</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">
                  {product.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="pl-4 pt-8 text-5xl uppercase text-Tan">
            {product.name}
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
        </div>
      </div>
    </div>
  );
}
