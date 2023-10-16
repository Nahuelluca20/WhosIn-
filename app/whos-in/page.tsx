import React from "react";

import AssistanceCard from "@/components/cards/assistance-card";

export default function page() {
  return (
    <main className="px-4 flex justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1440px]">
        <AssistanceCard />
        <AssistanceCard />
        <AssistanceCard />
        <AssistanceCard />
        <AssistanceCard />
        <AssistanceCard />
        <AssistanceCard />
      </div>
    </main>
  );
}
