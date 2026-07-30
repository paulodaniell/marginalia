import { Header } from "../components/Header";

export default function SnippetDetails() {
  return (
    <div className="min-h-screen bg-papel text-tinta flex flex-col font-sans">
      <Header />

      <main className="max-w-3xl mx-auto w-full p-6 mt-4 space-y-4">
        
        {/* Trecho Principal Selecionado */}
        <div className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-6 shadow-sm">
          <p className="font-serif text-lg text-tinta mb-3">
            "Os olhos de ressaca, o que iam buscar nao sei, se e que iam buscar alguma coisa."
          </p>
          <p className="text-xs text-tinta/60 mb-5">
            postado por Ines C. em Dom Casmurro
          </p>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-xs font-medium bg-tinta/5 text-tinta border border-tinta/10 rounded-lg hover:bg-tinta/10 transition-all">
              💬 Comentar
            </button>
            <button className="px-4 py-2 text-xs font-medium bg-indigo text-white rounded-lg hover:bg-indigo/90 transition-all shadow-sm">
              ✨ Perguntar a IA
            </button>
          </div>
        </div>

        {/* Resposta da IA */}
        <div className="bg-indigo/5 border border-indigo/20 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo text-white text-[10px] font-bold px-2 py-0.5 rounded">IA</span>
            <span className="text-xs text-tinta/70">perguntado por 9 pessoas</span>
          </div>
          <p className="font-sans text-sm text-tinta/90 leading-relaxed mb-4">
            "Olhos de ressaca" é uma metáfora pra um olhar profundo e envolvente, que puxa quem olha pra dentro, como a correnteza do mar.
          </p>
          <div className="flex items-center gap-4 text-xs text-tinta/60">
            <span>❤️ 21</span>
            <span>💬 2 respostas</span>
          </div>
        </div>

        {/* Comentário de outro usuário */}
        <div className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">RM</span>
            <span className="text-xs font-medium text-tinta">Rafael M.</span>
          </div>
          <p className="font-sans text-sm text-tinta/90 mb-4">
            Essa frase resume o livro inteiro pra mim, o narrador nunca tem certeza de nada sobre Capitu.
          </p>
          <div className="flex items-center gap-4 text-xs text-tinta/60">
            <span>❤️ 8</span>
            <span className="hover:underline cursor-pointer">responder</span>
          </div>
        </div>

      </main>
    </div>
  );
}