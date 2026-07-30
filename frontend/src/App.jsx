import { AuthProvider } from "../src/contexts/authContext";
import { AppRoutes } from "../src/routes/index";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
