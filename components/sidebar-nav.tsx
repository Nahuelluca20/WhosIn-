import {Tabs, TabsContent, TabsList, TabsTrigger} from "./ui/tabs";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string;
    value: string;
    content: React.ReactNode;
  }[];
}

export function SidebarNav({items}: SidebarNavProps) {
  return (
    <nav>
      <Tabs className="grid md:flex gap-8 md:justify-start" defaultValue="create-event">
        <aside className="-mx-2">
          <TabsList className="flex md:grid gap-0 sm:gap-2 justify-center md:justify-start md:justify-items-start w-full bg-trasparent">
            {items.map((item) => (
              <TabsTrigger
                key={item.title}
                className="xl:w-[212px] md:w-[142px] justify-start hover:bg-muted data-[state=active]:bg-muted"
                defaultValue={"create-event"}
                value={item.value}
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </aside>
        {items.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            {item.content}
          </TabsContent>
        ))}
      </Tabs>
    </nav>
  );
}
