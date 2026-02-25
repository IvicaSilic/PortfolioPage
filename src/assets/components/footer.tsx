export default function Footer({ darkMode }: { darkMode: boolean }) {
  return (
    <footer
      className={`px-8 py-6 flex justify-between items-center transition-colors duration-300 ${
        darkMode ? "bg-zinc-900 text-zinc-400" : "bg-zinc-100 text-zinc-500"
      }`}
    >
      <p className="text-sm">© 2026 Silic Ivica. All rights reserved.</p>
      <div className="flex gap-6 text-sm">
        <a href="#" target="_blank" className={`transition-colors duration-300 ${darkMode ? "hover:text-white" : "hover:text-zinc-900"}`}>GitHub</a>
        <a href="#" target="_blank" className={`transition-colors duration-300 ${darkMode ? "hover:text-white" : "hover:text-zinc-900"}`}>LinkedIn</a>
        <a href="#" className={`transition-colors duration-300 ${darkMode ? "hover:text-white" : "hover:text-zinc-900"}`}>Email</a>
      </div>
    </footer>
  );
}