"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AddProduct from "./prodotti/add-product";
import { DataTable } from "./prodotti/data-table";
import { columns } from "./prodotti/columns";
import { fetchProducts } from "../page";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "../api/products/route";
import { error } from "console";
import { Loader2 } from "lucide-react";
import NavbarAdmin from "./navbar";

export default function AdminPage() {
  // const auth = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   auth?.user?.jwt ? null : router.push("/admin/login");
  // }, [auth]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = () => {
    fetch("http://127.0.0.1:1337/api/products?populate=*", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const data = await fetchProducts();
  return (
    <div className="container mx-auto pt-20 font-Inter h-screen">
      <NavbarAdmin/>
      <h1 className="text-4xl">Prodotti</h1>
      <div className="text-right mb-4">
        <AddProduct></AddProduct>
      </div>
      {loading ? (
        <div className="w-full flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={products} />
      )}
    </div>
  );
}
