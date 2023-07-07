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
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<any>();
  const [preview, setPreview] = useState<any>();

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    console.log("ciaos");

    const api = "/api/products";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("picture", picture);
    try {
      const response = fetch(`${api}`, {
        method: "POST",
      });
      const res = (await response).json();
      console.log(await res);
      
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
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
              <div className="overflow-scroll h-32">
                <img src={preview} />
              </div>
              <Label htmlFor="picture">Nome</Label>
              <Input
                id="picture"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Label htmlFor="message">Descrizione</Label>
              <Textarea
                placeholder="Inserisci qui la descrizione..."
                id="message"
                onChange={(e) => setDescription(e.target.value)}
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annulla</AlertDialogCancel>

              <Button type="submit">Aggiungi</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
