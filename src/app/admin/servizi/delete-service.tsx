"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase/config";
import { Service } from "@/types/service";
import { deleteDoc, doc } from "firebase/firestore";
import { Trash2 } from "lucide-react";

export default function DeleteService({ service }: { service: Service }) {
  const handleDelete = (id: string) => {
    const docRef = doc(db, "services", id);

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
          <AlertDialogAction asChild onClick={() => handleDelete(service.id)}>
            <Button variant={"destructive"}>Elimina</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
