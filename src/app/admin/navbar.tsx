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
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function NavbarAdmin() {
  const auth = useAuth();
  const router = useRouter();
  return (
    <div className="bg-black w-full h-12 fixed top-0 left-0">
      <div className="w-full h-full px-8 text-white flex justify-between items-center">
        <p>{auth?.user?.user.email}</p>
        <Button
          onClick={() => {
            auth?.logout();
            router.push("/admin/login");
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
