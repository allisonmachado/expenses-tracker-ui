import { useAuthState } from "../../../hooks/useAuthState";

export default function PrivateComponent({ children }) {
  const auth = useAuthState();
  return (auth.user ? children : null);
}
