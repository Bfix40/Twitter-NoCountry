function Darkmode () {
  function swapTheme () {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(nextTheme);

    localStorage.setItem('theme', nextTheme);
  }

  return (
    <button
      className="p-2 bg-black text-white dark:bg-white dark:text-black w-fit font-medium text-sm"
      onClick={swapTheme}
    >
      Cambiar Tema
    </button>
  );
}

export default Darkmode;
