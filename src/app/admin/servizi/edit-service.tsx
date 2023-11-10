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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase/config";
import { Service } from "@/types/service";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Edit } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function EditService({ service }: { service: Service }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
  }, []);

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    const docRef = doc(db, "services", service.id);
    await updateDoc(docRef, { name, description, price } as Service)
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };

  const clearForm = () => {
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"default"}>
          <Edit size={20}></Edit>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          className="grid w-full max-w-sm items-center gap-3"
          onSubmit={(e) => handleEdit(e)}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Modifica il prodotto</AlertDialogTitle>
            <Label htmlFor="picture">Nome</Label>
            <Input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              defaultValue={service.name}
            />
            <Label htmlFor="message">Descrizione</Label>
            <Textarea
              placeholder="Inserisci qui la descrizione..."
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={service.description}
            />
            <Label htmlFor="price">Prezzo</Label>
            <Input
              placeholder="Inserisci qui il prezzo..."
              id="price"
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
              defaultValue={service.price}
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => clearForm()}>
              Annulla
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button type="submit">Modifica</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
