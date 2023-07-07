import Image from "next/image";
export default function CardProdotto({
  name,
  description,
  imageUrl,
}: {
  name: string;
  description: string;
  imageUrl: string;
}) {
  return (
    <div className="bg-black/80 shadow-md rounded-lg max-w-sm">
      <div className="flex flex-col w-full h-full">
        <a href="#">
          <Image
            className="rounded-t-lg"
            src={imageUrl}
            width={400}
            height={300}
            alt=""
          />
        </a>
        <div className="p-5 flex flex-col h-full justify-between">
          <div>
            <h5 className="text-white font-bold text-2xl tracking-tight mb-2">
              {name}
            </h5>
            <p className="font-normal text-gray-400 mb-3">{description}</p>
          </div>
          <a
            href="#"
            className="text-black bg-Tan hover:bg-Tan/80 focus:ring-4 font-medium rounded-sm text-sm px-3 py-2 text-center inline-flex items-center w-[120px]"
          >
            Scopri di più
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
