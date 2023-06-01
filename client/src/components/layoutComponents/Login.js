import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { signIn } from "next-auth/react";
export default function Login() {
  return (
    <div className="w-[332px] h-[321px] dark:border-2 border-black/20 dark:border-white/20 rounded-xl bg-white dark:bg-black border-[1px] ">
      <h2 className="text-2xl font-semibold dark:text-white ml-2 mt-2">
        ¿Eres nuevo en Twitter?
      </h2>
      <p className="dark:text-gray-400 text-sm m-2">
        Regístrate ahora para obtener tu propia cronología personalizada.
      </p>
      <button
        onClick={() => signIn("google", { callbackUrl: '/home' })}
        className="dark:bg-gray-50 dark:text-black dark:hover:bg-gray-300  py-2 px-4 rounded-full w-[300px] mx-3 my-2 flex items-center justify-center border-2 hover:bg-gray-300"
      >
        <FcGoogle className="w-6 h-6 mr-5" />
        <p className="mr-4">Registrase con Google</p>
      </button>
      <button
        onClick={() => signIn("facebook", { callbackUrl: '/home' })}
        className="text-black dark:bg-gray-50 dark:text-black py-2 px-4 rounded-full w-[300px] mx-3 font-semibold flex items-center justify-center border-2 hover:bg-gray-300 dark:hover:bg-gray-300"
      >
        <AiFillFacebook className="w-6 h-6" />
        <p className="ml-3">Registrarse con Facebook</p>
      </button>
      <button className="dark:bg-gray-50 dark:text-black  py-2 px-4 rounded-full w-[300px] mx-3 my-2 font-semibold border-2 dark:hover:bg-gray-300 hover:bg-gray-300">
        Crear cuenta
      </button>
      <p className="dark:text-gray-400 text-sm m-2">
        Al registrarte, aceptas los{" "}
        <strong className="text-blue-500">Términos de servicio</strong> y la{" "}
        <strong className="text-blue-500">Política de Privacidad</strong>,
        incluida la política de{" "}
        <strong className="text-blue-500">Uso de Cookies.</strong>
      </p>
    </div>
  );
}
