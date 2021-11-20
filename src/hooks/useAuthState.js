import { useContext } from "react";
import { AuthContext } from "../components/util/ProvideAuth";

export function useAuthState() {
  return useContext(AuthContext);
}