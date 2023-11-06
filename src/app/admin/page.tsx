import AddProduct from "./prodotti/add-product";
import { DataTable } from "./prodotti/data-table";
import { columns } from "./prodotti/columns";
import NavbarAdmin from "./navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types/product";

// const fetchData = async () => {
//   fetch("http://127.0.0.1:1337/api/products?populate=*", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "no-store",
//   })
//     .then((response) => response.json())
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => console.log(error));
// };

export default async function AdminPage() {
  const products = (await getDocs(collection(db, "products"))).docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Product[];
  products.forEach((doc) => {
    console.log(doc);
  });

  // const data = await fetchProducts();
  return (
    <div className="container mx-auto pt-20 font-Inter h-screen">
      <NavbarAdmin />
      <h1 className="text-4xl">Prodotti</h1>
      <div className="text-right mb-4"><AddProduct></AddProduct></div>
      {<DataTable columns={columns} data={products} />}
    </div>
  );
}
