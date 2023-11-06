import type { NextAuthOptions } from "next-auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "@/lib/firebase/config";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then((userCredentials) => {
            if (userCredentials.user) return userCredentials.user;
            return null;
          })
          .catch((error) => console.log(error));
      },
    }),
  ],
};
