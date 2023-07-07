"use client";
import { useAuth } from "@/context/AuthContext";

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
import { Button } from "@/components/ui/button";
import { Product } from "@/app/api/products/route";
import { Trash, Trash2 } from "lucide-react";

export default function DeleteProduct({ product }: { product: Product }) {
  const auth = useAuth();
  const handleDelete = (id: string) => {
    fetch("http://localhost:1337/api/products/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth?.user?.jwt}`,
      },
    })
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"destructive"}>
          {" "}
          <Trash2 size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Sei sicuro di voler eleminare il prodotto?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction asChild onClick={() => handleDelete(product.id)}>
            <Button variant={"destructive"}>Elimina</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
