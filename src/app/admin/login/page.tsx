"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLogIn() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const res = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({ identifier:email, password }),
      cache: "no-cache"
    });

    const json = await res.json();
    console.log(json.user);
    auth?.login(json)
    return json;
  };

  useEffect(() => {
    auth?.user?.jwt ? router.push("/admin") : null;
  }, [auth?.user?.jwt]);

  return (
    <div className="font-Inter h-screen flex justify-center items-center">
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button variant="default">Log In</Button>
          {auth?.user?.jwt ? (
            <p onClick={() => auth.logout()} className="bg-white">
              user si {auth.user.jwt}
            </p>
          ) : (
            <p className="bg-white">user no </p>
          )}
        </form>
      </div>
    </div>
  );
}
