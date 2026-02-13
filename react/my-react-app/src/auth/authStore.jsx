import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const LS_KEY = "auth_v1";

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { token: null, user: null };
  });

  const login = ({token, user}) => {
    const next = { token, user };
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    setState(next);
  };

  const logout = () => {
    localStorage.removeItem(LS_KEY);
    setState({ token: null, user: null });
  };

  const value = useMemo(() => ({
    token: state.token,
    user: state.user,
    isAuthed: Boolean(state.token),
    login,
    logout,
  }),
  [state]);
    
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const v = useContext(AuthContext);
    if(!v) throw new Error("useAuth must be used within AuthProvider");
    
    return v;
}