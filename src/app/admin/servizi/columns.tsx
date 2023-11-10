"use client";

import { ColumnDef } from "@tanstack/react-table";

import DeleteService from "./delete-service";
import EditService from "./edit-service";
import { Service } from "@/types/service";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    accessorKey: "price",
    header: "Prezzo",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div>
          {product.price} &euro;
        </div>
      );
    },
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const service = row.original;

      return <EditService service={service}></EditService>;
    },
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const service = row.original;

      return <DeleteService service={service}></DeleteService>;
    },
  },
];
