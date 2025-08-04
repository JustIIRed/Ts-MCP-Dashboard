import AppRoutes from "./routes/routes";
import Nav from "./pages/App/nav";
import { useAuthStore } from "./store/Zust/useAuthStore";
function App() {
  const authUser = useAuthStore((s) => s.authUser);
  return (
    <>
      {authUser && <Nav />}
      <AppRoutes />
    </>
  );
}
export default App;
