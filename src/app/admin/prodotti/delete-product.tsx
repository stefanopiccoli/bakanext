"use client";

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
import { db } from "@/lib/firebase/config";
import { Product } from "@/types/product";
import { deleteDoc, doc } from "firebase/firestore";
import { Trash2 } from "lucide-react";

export default function DeleteProduct({ product }: { product: Product }) {
  const handleDelete = (id: string) => {
    // fetch("http://localhost:1337/api/products/" + id, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: `Bearer`,
    //   },
    // })
    //   .then(() => window.location.reload())
    //   .catch((error) => console.log(error));

    const docRef = doc(db, "products", id);

    deleteDoc(docRef)
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
