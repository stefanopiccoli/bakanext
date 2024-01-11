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
import { addDoc, collection } from "firebase/firestore";
import { Plus } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Customer } from "@/types/customer";

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nickname, setNickname] = useState("");
  const [notes, setNotes] = useState("");

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "customers"), {
        name,
        surname,
        nickname,
        notes,
      } as Customer);
      console.log("Document written with ID: ", docRef.id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setName("");
    setSurname("");
    setNickname("");
    setNotes("");
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
              <AlertDialogTitle>Inserisci un nuovo cliente</AlertDialogTitle>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <Label htmlFor="surname">Cognome</Label>
              <Input
                id="surname"
                type="text"
                onChange={(e) => setSurname(e.target.value)}
              />
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                onChange={(e) => setNickname(e.target.value)}
              />
              <Label htmlFor="notes">Note</Label>
              <Textarea
                placeholder="Inserisci qui la note del cliente..."
                id="notes"
                onChange={(e) => setNotes(e.target.value)}
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
