import { init, products } from "@/lib/mongodb/products";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    if (!products) await init();
    const id  = req.url.split("products/")[1]
    console.log("prova");
    console.log(id);
    
    const result = await products.deleteOne({_id: new ObjectId(id)});
    return NextResponse.json({message: result}, {status: 200})
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500})
  }
}