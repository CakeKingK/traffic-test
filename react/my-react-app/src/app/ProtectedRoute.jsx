import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authStore.jsx";

export const ProtectedRoute = ({ children }) => {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to="/login" replace />;

  return children;
}
    