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
import { uploadImage } from "@/lib/cloudinary/uploadImage";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types/product";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Edit } from "lucide-react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function EditProduct({ product }: { product: Product }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
  }, []);

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    const api = "http://localhost:1337/api/upload";

    if (picture) {
      const formData = new FormData();
      formData.append("file", picture);
      formData.append("upload_preset", "wntlxiwr");
      const {
        data: { secure_url },
      } = await uploadImage(formData);
      const docRef = doc(db, "products", product.id);
      await updateDoc(docRef, {
        name,
        description,
        imageUrl: secure_url,
      } as Product)
        .then(() => window.location.reload())
        .catch((error) => console.log(error));
    } else {
      const docRef = doc(db, "products", product.id);
      await updateDoc(docRef, { name, description } as Product)
        .then(() => window.location.reload())
        .catch((error) => console.log(error));
    }
    //   fetch(`${api}`, {
    //     method: "POST",
    //     headers: { Authorization: `Bearer ` },
    //     body: formData,
    //   })
    //     .then((response) => response.json())
    //     .then((json) =>
    //       fetch("http://localhost:1337/api/products/" + product.id, {
    //         method: "PUT",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer`,
    //         },
    //         body: JSON.stringify({
    //           data: { name, description, picture: json[0].id },
    //         }),
    //       }).then(() => window.location.reload())
    //     )
    //     .catch((error) => console.log(error));
    // } else {
    //   fetch("http://localhost:1337/api/products/" + product.id, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer `,
    //     },
    //     body: JSON.stringify({
    //       data: { name, description },
    //     }),
    //   })
    //     .then(() => window.location.reload())
    //     .catch((error) => console.log(error));
    // }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setPicture(null);
    setPreview(null);
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
            <Label htmlFor="picture">Foto</Label>
            <Input id="picture" type="file" onChange={(e) => handleImage(e)} />
            {preview ? (
              <div className="overflow-scroll h-32">
                <img src={preview} />
              </div>
            ) : (
              <img src={product.imageUrl} />
            )}

            <Label htmlFor="picture">Nome</Label>
            <Input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
            />
            <Label htmlFor="message">Descrizione</Label>
            <Textarea
              placeholder="Inserisci qui la descrizione..."
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
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
