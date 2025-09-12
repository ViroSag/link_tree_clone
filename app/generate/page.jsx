"use client";

import { Suspense } from "react";
import GenerateContent from "./GenerateContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <GenerateContent />
    </Suspense>
  );
}
