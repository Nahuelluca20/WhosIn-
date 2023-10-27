import {CreateEventCard} from "@/components/cards/events/create-event-card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";

import DashboardTabContentLayout from "../dashboard/dashboard-tab-content-layout";
const tags = Array.from({length: 50}).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export default function CreateEventDisplay() {
  return (
    <DashboardTabContentLayout
      description={"Desde aquí puedes crear un evento para tu grupo"}
      title={"Crear Evento"}
    >
      <div className="flex gap-5 justify-center md:justify-start w-full flex-wrap max-w-[1000px]">
        <CreateEventCard />
        <ScrollArea className="max-h-[421.12px] w-full md:w-[261px] rounded-md border" type="auto">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {tags.map((tag) => (
              <>
                <div key={tag} className="text-sm">
                  {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    </DashboardTabContentLayout>
  );
}
