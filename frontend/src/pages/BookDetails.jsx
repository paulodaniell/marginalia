import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import api from "../service/api";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [excerpts, setExcerpts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExcerptContent, setNewExcerptContent] = useState("");

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const bookResponse = await api.get(`/books/${id}`);
        setBook(bookResponse.data);

        const excerptsResponse = await api.get(`/excerpts/book/${id}`);
        setExcerpts(excerptsResponse.data);
      } catch (error) {
        console.error("Erro ao carregar detalhes do livro:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [id]);

  async function handleCreateExcerpt(e) {
    e.preventDefault();
    if (!newExcerptContent.trim()) return;

    try {
      const response = await api.post(`/excerpts/book/${id}`, {
        content: newExcerptContent,
      });

      setExcerpts([response.data, ...excerpts]);
      setNewExcerptContent("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar trecho:", error);
      alert(error.response?.data?.message || "Erro ao cadastrar trecho.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-papel text-tinta flex flex-col font-sans">
        <Header />
        <main className="max-w-4xl mx-auto w-full p-8 text-center text-tinta/60">Carregando...</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-papel text-tinta flex flex-col font-sans">
      <Header />

      <main className="max-w-4xl mx-auto w-full p-8 space-y-6">
        <button onClick={() => navigate("/home")} className="text-xs text-tinta/50 hover:text-tinta cursor-pointer">
          ← voltar para home
        </button>

        {book && (
          <div className="bg-white/70 backdrop-blur-sm border border-tinta/10 rounded-3xl p-6 flex items-center gap-6 shadow-sm">
            <div className="w-24 h-32 rounded-2xl bg-[#F7D6C8] overflow-hidden flex-shrink-0 border border-black/5 flex items-center justify-center">
              {book.cover_url ? (
                <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
              ) : null}
            </div>
            <div>
              <h1 className="font-serif text-2xl text-tinta font-medium mb-1">{book.title}</h1>
              <p className="text-sm text-tinta/70">{book.author}</p>
            </div>
          </div>
        )}

        <div
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-tinta/20 rounded-2xl p-4 text-center text-xs text-tinta/60 hover:border-indigo hover:text-indigo hover:bg-white/40 transition-all cursor-pointer"
        >
          + Colar um novo trecho deste livro...
        </div>

        <div className="space-y-4">
          {excerpts.map((excerpt) => (
            <div
              key={excerpt.id}
              onClick={() => navigate(`/snippets/${excerpt.id}`)}
              className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-5 hover:border-indigo/40 hover:shadow-md transition-all cursor-pointer"
            >
              <p className="font-serif text-base text-tinta leading-relaxed mb-2">
                "{excerpt.content}"
              </p>
              <span className="text-xs text-tinta/50">
                {excerpt.annotationsCount || 0} anotações
              </span>
            </div>
          ))}

          {excerpts.length === 0 && (
            <p className="text-xs text-tinta/50 text-center py-6">Nenhum trecho cadastrado ainda.</p>
          )}
        </div>
      </main>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-tinta/10 rounded-3xl p-7 max-w-md w-full shadow-xl">
            <h2 className="font-serif text-xl text-tinta font-medium mb-1">Novo trecho</h2>
            <p className="text-xs text-tinta/60 mb-4">Cole abaixo o trecho retirado deste livro.</p>

            <form onSubmit={handleCreateExcerpt} className="space-y-4">
              <textarea
                required
                rows={4}
                placeholder="Digite ou cole o trecho aqui..."
                value={newExcerptContent}
                onChange={(e) => setNewExcerptContent(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-papel/50 border border-tinta/20 rounded-xl outline-none focus:border-indigo resize-none"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-tinta/70 hover:bg-tinta/5 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium bg-indigo text-white rounded-xl hover:bg-indigo/90 cursor-pointer"
                >
                  Salvar Trecho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}