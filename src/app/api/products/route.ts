import { init, products } from "@/lib/mongodb/products";
import { NextResponse } from "next/server";

export type Product = {
  id: string;
  attributes: {
    name: string;
    description: string;
    picture: {
      data: {
        attributes: { url: string };
      };
    };
  };
};

export async function GET(req: Request) {
  try {
    if (!products) await init();
    const result = await products.find({}).toArray();
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // if (!products) await init();
    const ris = await req.formData();
    console.log(ris);

    // const result = await products.insertOne({title, description})
    return NextResponse.json({ message: ris }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
