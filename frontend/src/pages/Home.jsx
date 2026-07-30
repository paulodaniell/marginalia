import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/authHook";
import api from "../service/api";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");


  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await api.get("/books"); 
        setBooks(response.data);
      } catch (error) {
        console.error("Erro ao carregar os livros do banco:", error);
      }
    }

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  async function handleCreateBook(e) {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    try {
      const response = await api.post("/books", {
        title: newTitle,
        author: newAuthor,
      });

      
      setBooks([response.data, ...books]);
      
      setNewTitle("");
      setNewAuthor("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar o livro no banco:", error);
      alert(error.response?.data?.message || "Erro ao tentar cadastrar o livro.");
    }
  }

  return (
    <div className="min-h-screen bg-papel text-tinta flex flex-col font-sans">
      <Header />

      <main className="max-w-6xl mx-auto w-full p-8 mt-4">
        
        
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-normal text-tinta mb-1">Explorar livros</h1>
          <p className="text-sm text-tinta/60">Selecione um livro para ver os trechos ou adicione um novo.</p>
        </div>

        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 text-sm bg-white/70 backdrop-blur-sm border border-tinta/15 rounded-2xl outline-none focus:border-indigo shadow-sm transition-all"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-indigo text-white text-sm font-medium rounded-2xl hover:bg-indigo/90 transition-all shadow-sm whitespace-nowrap cursor-pointer"
          >
            + Novo livro
          </button>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => navigate(`/books/${book.id}`)}
              className="bg-white/70 backdrop-blur-sm border border-tinta/10 rounded-3xl p-5 flex flex-col justify-between hover:border-indigo/40 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="bg-[#F7D6C8] h-32 rounded-2xl mb-4 shadow-inner border border-black/5" />
              <div>
                <h3 className="font-serif font-medium text-tinta text-base group-hover:text-indigo transition-colors line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-xs text-tinta/70 mb-3 line-clamp-1">{book.author}</p>
                <span className="text-[11px] text-tinta/50 font-medium bg-tinta/5 px-2.5 py-1 rounded-full">
                  {book.snippetsCount || 0} trechos
                </span>
              </div>
            </div>
          ))}

         
          <div
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-dashed border-tinta/20 rounded-3xl p-5 flex flex-col items-center justify-center text-center min-h-[220px] hover:border-indigo hover:bg-white/40 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-tinta/5 flex items-center justify-center text-tinta/50 group-hover:bg-indigo/10 group-hover:text-indigo transition-colors mb-2">
              +
            </div>
            <span className="text-xs font-medium text-tinta/70 group-hover:text-indigo transition-colors">
              Cadastrar livro
            </span>
          </div>

        </div>
      </main>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-tinta/10 rounded-3xl p-7 max-w-md w-full shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h2 className="font-serif text-2xl text-tinta font-medium mb-1">Cadastrar novo livro</h2>
            <p className="text-xs text-tinta/60 mb-6">Adicione um livro para começar a colar e anotar trechos.</p>

            <form onSubmit={handleCreateBook} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-tinta/80 mb-1">Título do livro</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Memórias Póstumas de Brás Cubas"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-papel/50 border border-tinta/20 rounded-xl outline-none focus:border-indigo"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-tinta/80 mb-1">Autor</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Machado de Assis"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-papel/50 border border-tinta/20 rounded-xl outline-none focus:border-indigo"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-medium text-tinta/70 hover:bg-tinta/5 rounded-xl transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-medium bg-indigo text-white rounded-xl hover:bg-indigo/90 transition-all shadow-sm cursor-pointer"
                >
                  Adicionar Livro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}