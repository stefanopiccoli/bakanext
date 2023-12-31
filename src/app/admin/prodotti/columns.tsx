"use client";

import { ColumnDef } from "@tanstack/react-table";

import DeleteProduct from "./delete-product";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import EditProduct from "./edit-product";
import { Product } from "@/types/product";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "Foto",
    id: "avatar",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div>
          <Image
            className="object-cover"
            src={product.imageUrl}
            alt={""}
            width={150}
            height={100}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    id: "edit",
    cell: ({ row }) => {
      const product = row.original;

      return <EditProduct product={product}></EditProduct>;
    },
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const product = row.original;

      return <DeleteProduct product={product}></DeleteProduct>;
    },
  },
];
