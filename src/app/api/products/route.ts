import { getProducts } from "@/lib/utils/mongo/products";
import { NextResponse } from "next/server";

export type Products = {
  _id: string
  name: string
  description: string
}

export async function GET(req: Request) {
    try {
      const { products, error } = await getProducts()
      if (error) throw new Error(error)
      return NextResponse.json({message:products}, {status: 200})
    } catch (error) {
      return NextResponse.json({error: error},{status: 500})
    }
}

