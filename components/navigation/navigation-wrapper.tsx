import {NavigationMenu} from "./navigation-menu";

export default function NavigationWrapper({children}: {children: React.ReactNode}) {
  return (
    <div>
      <NavigationMenu />
      {children}
    </div>
  );
}
