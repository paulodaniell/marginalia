import { NavLink, useNavigate } from "react-router-dom";
import LogoImg from "../assets/marginalia-wordmark.svg";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-papel text-tinta flex flex-col justify-between p-6 md:p-12 font-sans selection:bg-tinta/10">
      
      
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={LogoImg} alt="Marginalia" className="h-8 object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            className="px-4 py-2 text-sm font-medium text-tinta/80 hover:text-tinta transition-colors"
          >
            Entrar
          </NavLink>
          <NavLink
            to="/register"
            className="px-4 py-2 text-sm font-medium bg-tinta text-papel rounded-lg hover:bg-tinta/90 transition-all shadow-sm"
          >
            Criar conta
          </NavLink>
        </div>
      </header>

      
      <main className="max-w-4xl mx-auto w-full text-center my-auto py-12 flex flex-col items-center">
        
        
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-tinta mb-6 max-w-2xl leading-[1.15]">
          Leia trechos, anote com outros leitores, pergunte a IA
        </h1>
        <p className="text-sm md:text-base text-tinta/70 max-w-lg mb-10 font-light leading-relaxed">
          Cole um trecho de qualquer livro, veja o que outros leitores anotaram sobre ele e tire dúvidas com a IA sem sair da página.
        </p>

        
        <button
          onClick={() => navigate("/login")}
          className="group inline-flex items-center gap-2 px-6 py-3.5 bg-indigo text-white text-sm font-medium rounded-xl hover:bg-indigo/90 transition-all mb-16 shadow-sm cursor-pointer"
        >
          Explorar livros
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left">
          
          
          <div className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-6 flex flex-col justify-between hover:border-tinta/20 transition-colors shadow-sm">
            <div>
              <h3 className="font-medium text-tinta text-sm mb-1">Cole um trecho</h3>
              <p className="text-xs text-tinta/60 leading-relaxed">Sem precisar subir o livro inteiro</p>
            </div>
          </div>

          
          <div className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-6 flex flex-col justify-between hover:border-tinta/20 transition-colors shadow-sm">

            <div>
              <h3 className="font-medium text-tinta text-sm mb-1">Veja anotações</h3>
              <p className="text-xs text-tinta/60 leading-relaxed">De outros leitores no mesmo trecho</p>
            </div>
          </div>

          
          <div className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-6 flex flex-col justify-between hover:border-tinta/20 transition-colors shadow-sm">
            
            <div>
              <h3 className="font-medium text-tinta text-sm mb-1">Pergunte a IA</h3>
              <p className="text-xs text-tinta/60 leading-relaxed">Contexto e só aquele trecho</p>
            </div>
          </div>

        </div>

      </main>

      
      <footer className="max-w-6xl mx-auto w-full text-center pb-4">
        <p className="text-xs text-tinta/50 tracking-wide font-sans">
          14 livros · 340 trechos · 890 anotações
        </p>
      </footer>

    </div>
  );
}