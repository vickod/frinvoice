import { createContext } from "react";

export const DrawerContext = createContext({
  isDrawerOpen: false,
  setIsDrawerOpen: (isOpen: boolean) => {},
});
