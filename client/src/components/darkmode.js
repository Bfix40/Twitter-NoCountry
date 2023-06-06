import { BiCircleHalf } from "react-icons/bi";

function Darkmode ({ drawer }) {
  function swapTheme () {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(nextTheme);

    localStorage.setItem('theme', nextTheme);
  }

  return (
    <button
      className={"flex w-full items-center gap-4 py-2.5 text-left font-semibold transition duration-300 hover:bg-black/5 hover:dark:bg-white/10 " + (drawer ? "text-sm" : "p-4")}
      onClick={swapTheme}
    >
      <BiCircleHalf size={18} className="border rounded-full border-black dark:border-white" /> Cambiar Tema
    </button>
  );
}

export default Darkmode;
