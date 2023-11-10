import AddProduct from "./prodotti/add-product";
import AddService from "./servizi/add-service";
import { DataTable as DataTableProducts } from "./prodotti/data-table";
import { DataTable as DataTableServices } from "./servizi/data-table";
import { columns as productsColumns } from "./prodotti/columns";
import { columns as servicesColumns } from "./servizi/columns";
import NavbarAdmin from "./navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types/product";
import { Service } from "@/types/service";

export const revalidate = 0;
export default async function AdminPage() {
  const products = (await getDocs(collection(db, "products"))).docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Product[];

  const services = (await getDocs(collection(db, "services"))).docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Service[];

  return (
    <div className="container mx-auto pt-20 font-Inter">
      <NavbarAdmin />
      <h1 className="text-4xl">Prodotti</h1>
      <div className="text-right mb-4">
        <AddProduct></AddProduct>
      </div>
      {<DataTableProducts columns={productsColumns} data={products} />}
      <h1 className="text-4xl mt-8">Servizi</h1>
      <div className="text-right mb-4">
        <AddService></AddService>
      </div>

      {<DataTableServices columns={servicesColumns} data={services} />}
    </div>
  );
}
