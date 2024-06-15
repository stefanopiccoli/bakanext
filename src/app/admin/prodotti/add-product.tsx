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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types/product";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { Plus } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { uploadImage } from "@/lib/cloudinary/uploadImage";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<any>();
  const [preview, setPreview] = useState<any>();

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();

    const api = "http://localhost:1337/api/upload";
    const formData = new FormData();

    formData.append("file", picture);
    formData.append("upload_preset", "wntlxiwr");

    try {
      const {data: { secure_url }} = await uploadImage(formData);

      const docRef = await addDoc(collection(db, "products"), {
        imageUrl: secure_url,
        name,
        price,
        description,
      } as Product);
      console.log("Document written with ID: ", docRef.id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const clearForm = () => {
    setName("");
    setPrice(0);
    setDescription("");
    setPicture(null);
    setPreview(null);
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={"icon"} variant={"default"}>
            <Plus size={20}></Plus>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form
            className="grid w-full max-w-sm items-center gap-3"
            onSubmit={(e) => handleCreate(e)}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Inserisci un nuovo prodotto</AlertDialogTitle>
              <Label htmlFor="picture">Foto</Label>
              <Input
                id="picture"
                type="file"
                onChange={(e) => handleImage(e)}
              />
              {preview ? (
                <div className="overflow-scroll h-32">
                  <img src={preview} />
                </div>
              ) : null}

              <Label htmlFor="picture">Nome</Label>
              <Input
                id="picture"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                onChange={(e) => setPrice(e.target.valueAsNumber)}
              />
              <Label htmlFor="message">Descrizione</Label>
              <Textarea
                placeholder="Inserisci qui la descrizione..."
                id="message"
                onChange={(e) => setDescription(e.target.value)}
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => clearForm()}>
                Annulla
              </AlertDialogCancel>

              <AlertDialogAction asChild>
                <Button type="submit">Aggiungi</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
