import { db } from "@/lib/firebase/config";
import { Customer } from "@/types/customer";
import { collection, getDocs } from "firebase/firestore";
import NavbarAdmin from "../navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddCustomer from "./add-customer";
import ViewCustomer from "./view-customer";

export const revalidate = 0;
export default async function Customers() {
  const customers = (await getDocs(collection(db, "customers"))).docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Customer[];

  return (
    <div className="container mx-auto pt-20 font-Inter min-h-screen">
      <NavbarAdmin />
      <h1 className="text-4xl">Clienti</h1>
      <div className="text-right mb-4">
        <AddCustomer />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Alias</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">
                {customer.name} {customer.surname}
              </TableCell>
              <TableCell className="font-medium">
                {" "}
                {customer.nickname}{" "}
              </TableCell>
              <TableCell className="text-right">
                <ViewCustomer customer={customer} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
