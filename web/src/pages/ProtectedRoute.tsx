import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth();

  if (!auth || !(auth.token && auth.verify)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
