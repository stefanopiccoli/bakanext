import { Service } from "@/types/service";

export default function CardServizio({ service }: { service: Service }) {
  return (
    <div className="flex flex-col px-4">
      <h3 className="text-black font-Oswald400 text-2xl mb-4">{service.name} - <span>{service.price}&euro;</span></h3>
      <p className="italic font-Oswald300">{service.description}</p>
    </div>
  );
}
