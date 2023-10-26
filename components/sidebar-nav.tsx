import {Tabs, TabsList, TabsTrigger} from "./ui/tabs";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string;
    value: string;
  }[];
}

export function SidebarNav({items}: SidebarNavProps) {
  return (
    <nav>
      <Tabs className="" defaultValue="create-event">
        <TabsList className="flex md:grid gap-2 justify-center md:justify-start md:justify-items-start w-full bg-trasparent">
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
      </Tabs>
    </nav>
  );
}
