import {Avatar as AvatarUI, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function Avatar() {
  return (
    <AvatarUI>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </AvatarUI>
  );
}
