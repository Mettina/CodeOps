import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function loadUser() {
  try {
    const stored = localStorage.getItem("addis-eats-user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  function signIn(name) {
    const newUser = { name };
    setUser(newUser);
    localStorage.setItem("addis-eats-user", JSON.stringify(newUser));
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("addis-eats-user");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}