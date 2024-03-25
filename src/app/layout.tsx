import { Metadata } from "next";
import "./globals.css";
import { Oswald, Black_Ops_One, Inter} from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight:"500"});
const oswald400 = Oswald({ subsets: ["latin"], variable: "--font-oswald400", weight:"400"});
const oswald300 = Oswald({ subsets: ["latin"], variable: "--font-oswald300", weight:"300"});

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  variable: "--font-blackOpsOne",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-Inter",
  weight: "400",
});

export const metadata : Metadata = {
  title: "Baka Style | Underground Barber Shop",
  description: "Baka Style Underground Barber Shop, prossima fermata: lo stile!",
  authors: [{name:"Stefano Piccoli", url:"https://piccoli.dev"}],
  creator: "Stefano Piccoli",
  keywords: ["barber","barbershop","baka","bakastyle"],
  metadataBase: new URL("https://bakastyle.netlify.app")

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body
          className={
            oswald.variable + " " + blackOpsOne.variable + " " + inter.variable+ " " + oswald400.variable+ " " + oswald300.variable
          }
        >
          {children}
        </body>
      </html>
  );
}
