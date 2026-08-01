import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authHook";
import LogoImg from "../assets/marginalia-wordmark.svg";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="w-full bg-white/60 backdrop-blur-md border-b border-tinta/10 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      
      {/* Logo / Marca */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/home")}>
        <img src={LogoImg} alt="Marginalia" className="h-7 object-contain" />
      </div>

      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-xs font-sans text-tinta/70 hidden sm:inline">
              Olá, <strong className="text-tinta">{user.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-sans bg-tinta/5 text-tinta border border-tinta/10 px-3.5 py-2 rounded-xl font-medium hover:bg-tinta/10 transition-all cursor-pointer"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <NavLink
              to="/login"
              className="text-xs font-sans text-tinta px-4 py-2 rounded-xl font-medium hover:bg-tinta/5 transition-all"
            >
              Entrar
            </NavLink>
            <NavLink
              to="/register"
              className="text-xs font-sans bg-indigo text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo/90 transition-all shadow-sm"
            >
              Criar conta
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}