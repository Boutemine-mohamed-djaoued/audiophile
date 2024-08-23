import { createContext, useContext } from "react";
import { User } from "../types/user";

interface Context {
  user : User | null;
  setUser : any ;
}

export const userDataContext = createContext<Context | undefined>(undefined);

export function useUserDataContext() {
  const userData = useContext(userDataContext);
  if (userData === undefined) {
    throw new Error("name is undefined && nameContext need a provider");
  }
  return userData;
}
