"use client";

import { Product } from "@/app/api/products/route";
import { ColumnDef } from "@tanstack/react-table";


import { Button } from "@/components/ui/button";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const handleDelete = async (id:string) => {
  const res = await fetch('http://localhost:3000/api/products/'+id, {
    method: "DELETE",
    // body: JSON.stringify({id})
  });
  
  console.log(await res.json());
  
  return res;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "attributes.name",
    header: "Name",
  },
  {
    accessorKey: "attributes.description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Elimina</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sei sicuro di voler eleminare il prodotto?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annulla</AlertDialogCancel>
              <AlertDialogAction asChild onClick={()=>handleDelete(product.id)}><Button variant={"destructive"}>Elimina</Button></AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
