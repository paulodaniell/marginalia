export function BookCard({ title, author, cover_url, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white/70 backdrop-blur-sm border border-tinta/10 rounded-3xl p-5 flex flex-col justify-between hover:border-indigo/40 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="h-32 rounded-2xl mb-4 shadow-inner border border-black/5 overflow-hidden bg-[#F7D6C8] flex items-center justify-center">
        {cover_url ? (
          <img src={cover_url} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : null}
      </div>
      
      <div>
        <h3 className="font-serif font-medium text-tinta text-base group-hover:text-indigo transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-tinta/70 line-clamp-1">{author}</p>
      </div>
    </div>
  );
}