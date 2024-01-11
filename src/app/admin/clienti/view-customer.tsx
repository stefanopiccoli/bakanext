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
import { Customer } from "@/types/customer";
import { Product } from "@/types/product";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ChevronRight, Edit, User } from "lucide-react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function ViewCustomer({ customer }: { customer: Customer }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-7 rounded-md px-1" variant={"default"}>
          <ChevronRight size={20}></ChevronRight>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-14">
        <AlertDialogHeader className="min-h-[500px]">
          <div className="flex items-end mb-20">
            <User className="w-10 h-auto" />
            <div className="text-lg font-bold">
              {customer.name} {customer.surname}{" "}
              {customer.nickname !== "" ? "(" + customer.nickname + ")" : ""}
            </div>
          </div>
          <ul className="text-left text-lg">
            {customer.notes.split("\n").map((note, index) => (
              <li className="flex mb-4" key={index}>
                <ChevronRight />
                {note}
              </li>
            ))}
          </ul>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Chiudi</AlertDialogAction>

          {/* <AlertDialogAction asChild>
            <Button>Modifica</Button>
          </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
