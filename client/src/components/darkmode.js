import { BiCircleHalf } from "react-icons/bi";

function Darkmode ({ drawer, sidebar }) {
  function swapTheme () {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(nextTheme);

    localStorage.setItem('theme', nextTheme);
  }

  if (sidebar) {
    return <button onClick={swapTheme} className="flex dark:text-white w-fit items-center gap-4 rounded-3xl py-2 xl:p-3 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 xl:pr-4">
      <BiCircleHalf size={26} className="border rounded-full border-black dark:border-white" /><p className="max-xl:hidden">Cambiar Tema</p>
    </button>
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
