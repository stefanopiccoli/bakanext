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
import { useAuth } from "@/context/AuthContext";
import { Plus } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AddProduct() {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<any>();
  const [preview, setPreview] = useState<any>();

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();

    const api = "http://localhost:1337/api/upload";
    const formData = new FormData();

    formData.append("files", picture);

    fetch(`${api}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${auth?.user?.jwt}` },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) =>
        fetch("http://localhost:1337/api/products", {
          method: "POST",
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
              <Label htmlFor="message">Descrizione</Label>
              <Textarea
                placeholder="Inserisci qui la descrizione..."
                id="message"
                onChange={(e) => setDescription(e.target.value)}
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>clearForm()}>Annulla</AlertDialogCancel>

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
