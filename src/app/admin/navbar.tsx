"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Session } from "next-auth";
import { getSession, signOut} from "next-auth/react";
import { useEffect, useState } from "react";

export default function NavbarAdmin() {
  const [session, setSession] = useState<Session|null>()
  useEffect(() => {
    (async function fetchSession() {
      const session = await getSession();
      setSession(session)
    })();
  }, []);

  return (
    <div className="bg-black w-full h-12 fixed top-0 left-0">
      {session?.user ? (
        <div className="w-full h-full px-8 text-white flex justify-between items-center">
          <p>Signed in as {session.user.email}</p>
          <Button onClick={() => signOut()}>Log out</Button>
        </div>
      ) : (
        <Button>Login</Button>
      )}
    </div>
  );
}
