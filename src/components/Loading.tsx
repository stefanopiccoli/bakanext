import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full flex justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
