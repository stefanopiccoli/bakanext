import AddProduct from "./add-product";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchProducts } from "@/app/page";

export default async function DemoPage() {
  const data = await fetchProducts();

  return (
    <div className="container mx-auto py-10 font-Inter">
      <div className="text-right">
        <AddProduct></AddProduct>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
