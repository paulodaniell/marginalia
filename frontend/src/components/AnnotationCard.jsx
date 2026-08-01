export function AnnotationCard({ annotation, user, likedIds, onToggleLike, onDelete, onReply }) {
  const isAuthor = annotation.author_id === user?.id || annotation.submitted_by === user?.id;
  const liked = likedIds.has(annotation.id);

  const authorName = isAuthor ? "Você" : (annotation.user_name || "Usuário");

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        {annotation.is_ai_generated ? (
          <span className="bg-grifo/20 text-grifo text-[11px] font-medium px-2 py-0.5 rounded-full">IA</span>
        ) : (
          <span className="text-xs font-semibold text-indigo">
            {authorName}
          </span>
        )}
      </div>

      <p className="text-sm text-tinta leading-relaxed mb-3">{annotation.content}</p>

      <div className="flex items-center gap-4 text-xs text-tinta/65">
        <button 
          onClick={() => onToggleLike(annotation.id)} 
          className={liked ? "text-nota font-medium cursor-pointer" : "hover:text-tinta cursor-pointer"}
        >
          {liked ? "❤ curtido" : "♡ curtir"}
        </button>
        <button 
          onClick={() => onReply(annotation.id)} 
          className="hover:text-tinta cursor-pointer"
        >
          responder
        </button>
        {isAuthor && (
          <button 
            onClick={() => onDelete(annotation.id)} 
            className="text-nota hover:underline cursor-pointer"
          >
            apagar
          </button>
        )}
      </div>
    </div>
  );
}