"use server";

export async function fetchReservations() {
  const today = new Date();
  const startTime = new Date()
  var found = 0;
  var date = today;
  var reservations = {};
  while ((found < 5) && ((new Date().getTime() - startTime.getTime()) < 8000)) {
    const url = `https://www.iprenota.it/slots/list?data=${date.toLocaleDateString("it-IT",{ dateStyle: "short" })}&idRisorsa=4fdf5bb8-b654-4b59-bc3e-35c1ae469d8a&idPrestazione=b5fc9c3a-7164-4392-81cd-5a68ed983e31&ignoraOreLimitePrenotazione=false&_=1711046609120`;
    const res = await (await fetch(url,{next: {revalidate:0}})).json();
    // if (res.StatusCode === 500) {
    //   reservations = {
    //     ...reservations,
    //     [date.toLocaleDateString("it-IT", { dateStyle: "short" })]: "Chiuso",
    //   };
    // }
    // if (res.StatusCode === 200 && Array.isArray(res.Data) && !res.Data.length) {
    //   reservations = {
    //     ...reservations,
    //     [date.toLocaleDateString("it-IT", { dateStyle: "short" })]: "Sold out!",
    //   };
    // }
    if (Array.isArray(res.Data) && res.Data.length) {
      found += 1;
      reservations = {...reservations,[date.toLocaleDateString("it-IT", { dateStyle: "short" })]: res.Data};
    }
    date.setDate(date.getDate() + 1);    
  }

  
  return reservations;
}
