import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function ProvideAuth({ children, authService }) {
  const [user, setUser] = useState(authService.getAuthenticatedUser());

  function signIn(user) {
    setUser(user);
  }

  function signOut() {
    setUser(null);
  }

  const auth = { user, signIn, signOut };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
