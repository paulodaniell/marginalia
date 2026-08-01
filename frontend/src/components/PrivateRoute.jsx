import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/authHook";

export function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
