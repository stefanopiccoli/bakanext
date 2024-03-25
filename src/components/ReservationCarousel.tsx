"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { fetchReservations } from "../utils/FetchReservationServer";
import { Loader2Icon } from "lucide-react";
import ButtonPrenota from "./ButtonPrenota";

export default function ReservationCarousel() {
  const [current, setCurrent] = useState(0);

  const [api, setApi] = useState<CarouselApi>();
  const [reservation, setReservation] = useState<any>({});
  const [loading, setLoading] = useState(true);

  var startIndex = Object.values(reservation).findIndex((el) =>
    Array.isArray(el)
  );
  const fetchh = async () => {
    const r: any = await fetchReservations();
    setReservation(r);
    // console.log(reservation);
    setLoading(false);
  };

  useEffect(() => {
    fetchh();
  }, []);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, startIndex]);

  if (loading) return <div className="h-44 flex justify-center items-center bg-black"><Loader2Icon size={70} className="animate-spin text-Tan"/></div>;
  else
    return (
      <div className="bg-black px-12 py-8">
        <Carousel
          setApi={setApi}
          orientation="horizontal"
          opts={{startIndex: startIndex }}
          className="h-full max-w-screen-lg mx-auto"
        >
          <CarouselContent className="h-12">
            {Object.keys(reservation).map((item, index) => (
              <CarouselItem
                className="h-full text-white flex justify-center items-center font-Oswald400 text-2xl flex-col gap-3"
                key={index + 100}
              >
                {item}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-Tan border-black h-full rounded-none bg-transparent text-white hover:bg-Tan disabled:hidden" />
          <CarouselNext className="bg-Tan border-black h-full rounded-none bg-transparent text-white hover:bg-Tan disabled:hidden" />
        </Carousel>
        <Carousel
          orientation="horizontal"
          className="h-full max-w-screen-lg mx-auto"
        >
          <CarouselContent className="h-32">
            {Array.isArray(Object.values(reservation)[current]) ? (
              (Object.values(reservation)[current] as any).map(
                (item: any, index: any) => (
                  <CarouselItem
                    key={index}
                    className="h-full text-white flex justify-center items-center font-Oswald400 text-5xl flex-col gap-3"
                  >
                    <div>
                      {item.OraInizio} - {item.OraFine}
                    </div>
                  </CarouselItem>
                )
              )
            ) : (
              <CarouselItem className="h-full text-white flex justify-center items-center font-Oswald400 text-5xl flex-col gap-3">
                {Object.values(reservation)[current] as any}
              </CarouselItem>
            )}
          </CarouselContent>
          {Array.isArray(Object.values(reservation)[current]) &&
          (Object.values(reservation)[current] as any).length > 1 ? (
            <>
              <CarouselPrevious className="bg-Tan border-black h-full rounded-none bg-transparent text-white hover:bg-Tan disabled:hidden" />
              <CarouselNext className="bg-Tan border-black h-full rounded-none bg-transparent text-white hover:bg-Tan disabled:hidden" />
            </>
          ) : null}
          {/* <CarouselPrevious className="bg-Tan border-black h-full rounded-none bg-transparent text-white hover:bg-Tan" />
        <CarouselNext className="bg-Tan border-black h-full rounded-none bg-transparent text-white hover:bg-Tan" /> */}
        </Carousel>
        <ButtonPrenota classe="text-center"/>
      </div>
    );
}