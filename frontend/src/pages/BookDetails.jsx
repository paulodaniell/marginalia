import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

const mockSnippets = [
  { id: 1, text: '"Ao Menor, Meu Amigo. Digo Que este e o Filho Do Meu Coracao"', author: "Rafael M.", commentsCount: 6 },
  { id: 2, text: '"Os olhos de ressaca, o que iam buscar nao sei, se e que iam buscar alguma coisa."', author: "Ines C.", commentsCount: 12 },
  { id: 3, text: '"Capitu era uma jovem de dezessete anos, cheia de vida e de conviccao."', author: "Diego S.", commentsCount: 3 },
];

export default function BookDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-papel text-tinta flex flex-col font-sans">
      <Header />

      <main className="max-w-3xl mx-auto w-full p-6 mt-4 space-y-6">
        
        
        <div className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="bg-[#F7D6C8] w-20 h-28 rounded-xl shadow-inner shrink-0" />
          <div>
            <h1 className="font-serif text-2xl text-tinta font-medium">Dom Casmurro</h1>
            <p className="text-sm text-tinta/70">Machado de Assis</p>
          </div>
        </div>

        
        <div className="bg-white/60 backdrop-blur-sm border border-dashed border-tinta/20 rounded-xl p-4 text-center cursor-pointer hover:border-indigo transition-colors shadow-sm">
          <span className="text-xs font-medium text-tinta/70">
            + Colar um novo trecho deste livro...
          </span>
        </div>

        
        <div className="space-y-4">
          {mockSnippets.map((snippet) => (
            <div
              key={snippet.id}
              onClick={() => navigate(`/snippets/${snippet.id}`)}
              className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-5 hover:border-tinta/25 transition-all cursor-pointer shadow-sm flex flex-col justify-between"
            >
              <p className="font-serif text-base text-tinta mb-4">{snippet.text}</p>
              <div className="flex items-center justify-between text-xs text-tinta/60">
                <span>postado por {snippet.author}</span>
                <span>💬 {snippet.commentsCount} anotações</span>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}