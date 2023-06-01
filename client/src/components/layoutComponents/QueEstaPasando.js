const { default: Link } = require("next/link");

function QueEstaPasando() {
  return (<div className="w-[330px] h-[510px] dark:bg-[#16181C] rounded-md">
    <div className="flex flex-col gap-3 p-3">
      <h2 className="text-2xl font-semibold dark:text-white">Que esta pasando</h2>
      <div className="dark:text-white hover:bg-blue-100 transition-all duration-300 rounded-md cursor-pointer p-1">
        <p className="text-gray-500 text-sm">Tendencia en Argentina</p>
        <p>#lluvia </p>
        <p className="text-gray-500 text-sm">3,4 mil Tweets</p>
      </div>
      <div className="dark:text-white hover:bg-blue-100 rounded-md cursor-pointer p-1 transition-all duration-30">
        <p className="text-gray-500 text-sm">Tecnologia - Tendencia</p>
        <p>Node - Next Js</p>
        <p className="text-gray-500 text-sm">20,6 mil Tweets</p>
      </div>
      <div className="dark:text-white hover:bg-blue-100 rounded-md cursor-pointer p-1 transition-all duration-30">
        <p className="text-gray-500 text-sm">Tendencia en Argentina</p>
        <p>#dolarblue</p>
      </div>
      <div className="dark:text-white hover:bg-blue-100 rounded-md cursor-pointer p-1 transition-all duration-30">
        <p className="text-gray-500 text-sm">Tendencia en Argentina</p>
        <p>Granizo</p>
        <p className="text-gray-500 text-sm">4,3 mil Tweets</p>
      </div>
      <div className="dark:text-white hover:bg-blue-100 rounded-md cursor-pointer p-1 transition-all duration-30">
        <p className="text-gray-500 text-sm">Tecnologia - Tendencia</p>
        <p>Phyton</p>
        <p className="text-gray-500 text-sm">20,2 mil Tweets</p>
      </div>
      <Link href="/explore" className="text-blue-500 text-md">Mostrar más</Link>
    </div>
  </div>)
}
export default QueEstaPasando;
