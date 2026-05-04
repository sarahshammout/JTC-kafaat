const pages = ['JTC','Mashgool','962','CMC','Z-HUB','Kafaat',];

export default function MainNav() {
  return (
    <nav className="flex flex-wrap justify-between items-center px-4 sm:px-10 py-3 sm:py-4 bg-[#0cafa3] border-b border-white/20">
  <div className="text-white font-bold text-xl ">
    <span className="text-xl font-bold">Kafa'at</span>
    <span className="text-sm opacity-40 ml-1">كفاءات</span>
  </div>
  <div className="flex flex-wrap gap-1 sm:gap-2">
    {pages.map((page) => (
      <span key={page} className="text-white px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm cursor-default hover:bg-white/20 transition-colors">
        {page}
      </span>
    ))}
  </div>
</nav>
  );
}