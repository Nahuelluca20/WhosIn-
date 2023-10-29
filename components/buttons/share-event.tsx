"use client";
import {Send} from "lucide-react";

import {Button} from "../ui/button";

export default function ShareEventButton({eventUrl}: {eventUrl: string}) {
  const openWhatsApp = () => {
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(eventUrl)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <Button className="bg-green-500 flex gap-2" onClick={openWhatsApp}>
      Invitar <Send height={20} width={20} />
    </Button>
  );
}
