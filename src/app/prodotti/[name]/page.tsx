import React from 'react'


const fetchData = async () =>{
  try {
    const res = await fetch("http://127.0.0.1:1337/api/products?populate=*", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const message = await res.json();
    console.log(message.data);

    return message.data;
  } catch (error) {
    console.log(error);
  }
}

export default function ProductDescription({params}:{params:{name:string}}) {
  return (
    <div></div>
  )
}
