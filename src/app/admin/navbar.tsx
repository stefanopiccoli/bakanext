"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NavbarAdmin() {
  const [session, setSession] = useState<Session | null>();
  useEffect(() => {
    (async function fetchSession() {
      const session = await getSession();
      setSession(session);
    })();
  }, []);

  return (
    <div className="bg-black w-full h-12 fixed top-0 left-0">
      <div className="w-full h-full px-8 text-white flex justify-between items-center">
        {session?.user ? (
          <>
            <p>Benvenuto {session.user.email?.split("@")[0]}</p>
            <Button onClick={() => signOut()}>Log out</Button>
          </>
        ) : (
          <div className="flex">
            <span className="mr-2">Verificando l&apos;accesso</span>
            <Loader2 size={20} color="white" className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
