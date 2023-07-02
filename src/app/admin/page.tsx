"use client";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const user = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    user ? null : router.push("/admin/login");
  }, [user]);


  return (
    <div className="p-4 font-Oswald text-white">
      <div className="text-white text-3xl font-Oswald text-center">ADMIN</div>
      <div className="flex flex-col items-center pt-5">
        <Image src="/images/BronxWax.jpg" alt="prodotti" width={300} height={300} className="border-2 border-white"/>
        <p className="text-2xl">Prodotti</p>
      </div>
    </div>
  );
}
