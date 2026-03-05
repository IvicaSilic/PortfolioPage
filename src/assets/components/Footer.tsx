export default function Footer() {
  return (
    <footer className="px-8 py-6 flex justify-between items-center bg-zinc-100 text-zinc-500">
      <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
      <div className="flex gap-6 text-sm">
        <a href="https://github.com/IvicaSilic" target="_blank" rel="noreferrer" className="transition-colors duration-300 hover:text-zinc-900">GitHub</a>
        <a href="https://www.linkedin.com/in/ivica-%C5%A1ili%C4%87-a1ab0420b/" target="_blank" rel="noreferrer" className="transition-colors duration-300 hover:text-zinc-900">LinkedIn</a>
        <a href="mailto:silic.ivica01@gmail.com" className="transition-colors duration-300 hover:text-zinc-900">Email</a>
      </div>
    </footer>
  );
}