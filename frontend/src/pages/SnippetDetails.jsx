import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { AnnotationCard } from "../components/AnnotationCard";
import { useAuth } from "../hooks/authHook";
import api from "../service/api";

export default function SnippetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [excerpt, setExcerpt] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const [likedIds, setLikedIds] = useState(new Set());

  const [showAskAI, setShowAskAI] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    setLoading(true);
    setErrorMsg("");
    try {
      const excerptResponse = await api.get(`/excerpts/${id}`);
      setExcerpt(excerptResponse.data);

      const annotationsResponse = await api.get(`/annotations/excerpt/${id}`);
      setAnnotations(annotationsResponse.data);
    } catch (error) {
      setErrorMsg(error.response?.data?.erro || "Erro ao carregar o trecho");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSending(true);
    try {
      await api.post(`/annotations/excerpt/${id}`, { content: newComment });
      setNewComment("");
      loadData();
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao publicar anotação");
    } finally {
      setSending(false);
    }
  }

  async function handleReply(parentId) {
    if (!replyText.trim()) return;

    try {
      await api.post(`/annotations/excerpt/${id}/reply/${parentId}`, { content: replyText });
      setReplyText("");
      setReplyingTo(null);
      loadData();
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao responder");
    }
  }

  async function handleDelete(annotationId) {
    if (!window.confirm("Apagar esta anotação?")) return;
    try {
      await api.delete(`/annotations/${annotationId}`);
      loadData();
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao apagar anotação");
    }
  }

  async function handleToggleLike(annotationId) {
    const alreadyLiked = likedIds.has(annotationId);
    try {
      if (alreadyLiked) {
        await api.delete(`/likes/annotations/${annotationId}/like`);
        setLikedIds((prev) => {
          const next = new Set(prev);
          next.delete(annotationId);
          return next;
        });
      } else {
        await api.post(`/likes/annotations/${annotationId}/like`);
        setLikedIds((prev) => new Set(prev).add(annotationId));
      }
    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao curtir anotação");
    }
  }

  function handleAskAI(e) {
    e.preventDefault();
    alert("Servico de IA ainda nao conectado.");
  }

  const topLevel = annotations.filter((a) => !a.parent_id);
  const repliesOf = (parentId) => annotations.filter((a) => a.parent_id === parentId);

  return (
    <div className="min-h-screen bg-papel text-tinta flex flex-col font-sans">
      <Header />

      <main className="max-w-2xl mx-auto w-full p-6 mt-4 space-y-6">
        {loading && <p className="text-sm text-tinta/60">Carregando...</p>}
        {errorMsg && <p className="text-sm text-nota">{errorMsg}</p>}

        {!loading && excerpt && (
          <>
            <button onClick={() => navigate(-1)} className="text-xs text-tinta/50 hover:text-tinta cursor-pointer">
              ← voltar
            </button>

            <div className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-5 shadow-sm">
              <p className="font-serif text-lg text-tinta leading-relaxed mb-3">
                "{excerpt.content}"
              </p>
              <p className="text-xs text-tinta/50">
                postado por {excerpt.submitted_by === user?.id ? "você" : (excerpt.user_name || "usuário")}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowAskAI((v) => !v)}
                  className="px-3 py-1.5 bg-grifo/15 text-grifo text-xs font-medium rounded-lg cursor-pointer"
                >
                  ✦ Perguntar à IA
                </button>
              </div>

              {showAskAI && (
                <form onSubmit={handleAskAI} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="O que você quer saber sobre esse trecho?"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-white border border-tinta/20 rounded-lg outline-none focus:border-indigo"
                  />
                  <button type="submit" className="px-4 py-2 bg-grifo text-white text-sm font-medium rounded-lg cursor-pointer">
                    Perguntar
                  </button>
                </form>
              )}
            </div>

            <form onSubmit={handleCreateComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Escreva uma anotação sobre esse trecho..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3.5 py-2 text-sm bg-white border border-tinta/20 rounded-lg outline-none focus:border-indigo"
              />
              <button
                type="submit"
                disabled={sending}
                className="px-4 py-2 bg-indigo text-white text-sm font-medium rounded-lg disabled:opacity-60 cursor-pointer"
              >
                {sending ? "..." : "Comentar"}
              </button>
            </form>

            <div className="space-y-3">
              {topLevel.map((annotation) => (
                <div key={annotation.id} className="space-y-3">
                  <AnnotationCard
                    annotation={annotation}
                    user={user}
                    likedIds={likedIds}
                    onToggleLike={handleToggleLike}
                    onDelete={handleDelete}
                    onReply={(id) => setReplyingTo(replyingTo === id ? null : id)}
                  />

                 
                  {replyingTo === annotation.id && (
                    <div className="flex gap-2 ml-6 mt-2">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Escreva uma resposta..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-white border border-tinta/20 rounded-lg outline-none focus:border-indigo"
                      />
                      <button
                        onClick={() => handleReply(annotation.id)}
                        className="px-3 py-1.5 bg-indigo text-white text-xs font-medium rounded-lg cursor-pointer"
                      >
                        Enviar
                      </button>
                    </div>
                  )}

                  
                  {repliesOf(annotation.id).length > 0 && (
                    <div className="pl-6 border-l-2 border-tinta/10 space-y-3">
                      {repliesOf(annotation.id).map((reply) => (
                        <AnnotationCard
                          key={reply.id}
                          annotation={reply}
                          user={user}
                          likedIds={likedIds}
                          onToggleLike={handleToggleLike}
                          onDelete={handleDelete}
                          onReply={(id) => setReplyingTo(replyingTo === id ? null : id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {topLevel.length === 0 && (
                <p className="text-sm text-tinta/50 text-center py-4">
                  Nenhuma anotação ainda. Seja o primeiro a comentar.
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}