const themes: Record<string, { bg: string; color: string }> = {
  jtc: { bg: '#0cafa3', color: '#ffffff' },
};

interface Props {
  theme: string;
  children: React.ReactNode;
}

export default function ProjectLayout({ theme, children }: Props) {
  const t = themes[theme] || themes.jtc;
  return (
    <div
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: t.bg,
        color: t.color,
        display: 'flex',       
        flexDirection: 'column', 
      }}
    >
      {children}
    </div>
  );
}