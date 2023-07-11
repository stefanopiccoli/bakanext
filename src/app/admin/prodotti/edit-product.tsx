"use client";
import { Product } from "@/app/api/products/route";
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
import { useAuth } from "@/context/AuthContext";
import { Edit } from "lucide-react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function EditProduct({ product }: { product: Product }) {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);

  useEffect(() => {
    setName(product.attributes.name);
    setDescription(product.attributes.description);
  }, []);

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();

    const api = "http://localhost:1337/api/upload";

    if (picture) {
      const formData = new FormData();

      formData.append("files", picture);

      fetch(`${api}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${auth?.user?.jwt}` },
        body: formData,
      })
        .then((response) => response.json())
        .then((json) =>
          fetch("http://localhost:1337/api/products/" + product.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth?.user?.jwt}`,
            },
            body: JSON.stringify({
              data: { name, description, picture: json[0].id },
            }),
          }).then(() => window.location.reload())
        )
        .catch((error) => console.log(error));
    } else {
      fetch("http://localhost:1337/api/products/" + product.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.user?.jwt}`,
        },
        body: JSON.stringify({
          data: { name, description },
        }),
      })
        .then(() => window.location.reload())
        .catch((error) => console.log(error));
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
              <img src={product.attributes.picture.data.attributes.url} />
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
