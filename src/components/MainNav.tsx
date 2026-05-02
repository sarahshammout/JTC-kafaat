const pages = ['JTC','Mashgool','962','CMC','Z-HUB','Kafaat',];

export default function MainNav() {
  return (
    <nav className="flex justify-between items-center px-20 py-4 bg-[#0cafa3] border-b border-white/20">
      <div className="text-white font-bold text-xl">
        <div className="logo">
          <span className="text-xl font-bold">Kafa'at</span>
          <span className="text-sm opacity-50 ml-1">كفاءات</span>
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center">
        {pages.map((page) => (
          <span key={page}
            className="text-white px-4 py-1.5 rounded-lg text-sm cursor-default hover:bg-white/20 transition-colors">
            {page}
          </span>
        ))}
      </div>
    </nav>
  );
}