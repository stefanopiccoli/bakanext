"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import signIn from "@/lib/firebase/auth/signin";
import { useAuthContext } from "@/context/AuthContext";
import signOutt from "@/lib/firebase/auth/signout";
import { useRouter } from "next/navigation";

export default function AdminLogIn() {
  const user = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    console.log("success login");
  };

  useEffect(() => {
    user ? router.push("/admin") : null
  }, [user])
  

  return (
    <div className="font-Oswald h-screen flex justify-center items-center">
      <div className="w-96 h-2/3 border-2 border-gray-50 rounded-sm">
        <form
          onSubmit={handleForm}
          className="h-full px-14 py-5 flex flex-col gap-4"
        >
          <Image
            className="self-center"
            src="/images/BakaLogo2.png"
            width={200}
            height={200}
            alt="logo"
          />
          <p className="text-white">Nome utente:</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <p className="text-white">Password:</p>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <input
            className="text-white border-2 border-gray-50 h-8"
            type="submit"
            value="Accedi"
          />
          {user ? (
            <p onClick={()=>signOutt()} className="bg-white">user si {user.email}</p>
          ) : (
            <p className="bg-white">user no </p>
          )}
        </form>
      </div>
    </div>
  );
}
