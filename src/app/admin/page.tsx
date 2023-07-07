"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchProducts } from "@/app/page";
import AddProduct from "./prodotti/add-product";
import { DataTable } from "./prodotti/data-table";
import { columns } from "./prodotti/columns";

export default async function AdminPage() {
  const auth = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   auth?.user?.jwt ? null : router.push("/admin/login");
  // }, [auth]);

  const data = await fetchProducts();
  return (
    <div className="container mx-auto py-10 font-Inter h-screen">
      <h1 className="text-4xl">Prodotti</h1>
      <div className="text-right mb-4">
        <AddProduct></AddProduct>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
