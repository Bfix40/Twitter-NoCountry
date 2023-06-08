import React, { useState } from "react";
import { IoLogoTwitter } from "react-icons/io";
import { AiFillFacebook, AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
function ModalLogin({ setShowModal }) {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="fixed top-20 mx-auto flex h-[650px] w-[600px] justify-center rounded-lg bg-white">
        <div className="mt-2">
          <button onClick={() => setShowModal(false)}>
            {" "}
            <AiOutlineClose className="absolute left-2 top-4 h-6 w-6 text-black" />
          </button>

          <div className="flex items-center justify-center gap-4">
            <IoLogoTwitter className="h-10 w-10 text-blue-400" />
          </div>
          <div className="flex max-w-sm">
            <h2 className="text-4xl font-bold text-black ">
              Inicia sesión en Twitter
            </h2>
          </div>
          <div className="mt-12">
            <button
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              className="mx-3 my-2 flex  w-[300px] items-center justify-center rounded-full border-2 px-4 py-2 hover:bg-gray-300 dark:bg-gray-50 dark:text-black dark:hover:bg-gray-300"
            >
              <FcGoogle className="mr-5 h-6 w-6" />
              <p className="mr-4">Iniciar sesión con Google</p>
            </button>
            <button
              onClick={() => signIn("facebook", { callbackUrl: "/home" })}
              className="mx-3 mt-4 flex w-[300px] items-center justify-center rounded-full border-2 px-4 py-2 font-semibold text-black hover:bg-gray-300 dark:bg-gray-50 dark:text-black dark:hover:bg-gray-300"
            >
              <AiFillFacebook className="h-6 w-6" />
              <p className="ml-3">Iniciar sesión con Facebook</p>
            </button>
            <button className="mx-3 my-2 mt-4 w-[300px] rounded-full border-2 px-4 py-2 font-semibold hover:bg-gray-300 dark:bg-gray-50 dark:text-black dark:hover:bg-gray-300">
              Crear cuenta
            </button>
          </div>
          <div className="my-4 ml-4 flex w-[300px] items-center">
            <hr className="flex-grow border"></hr>
            <span className="mx-4 text-gray-500">o</span>
            <hr className="flex-grow border"></hr>
          </div>
          <div>
            <input
              type="text"
              className="ml-4 h-[55px] w-[300px] rounded-md border-2 border-gray-300 bg-white px-4 py-2 transition-all duration-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Teléfono, correo electrónico o nombre de usuario"
            ></input>
            <button className="mx-3 my-2 mt-4 flex w-[300px] items-center justify-center rounded-full border-2 bg-black px-4 py-2 hover:bg-gray-300  dark:text-black dark:hover:bg-gray-300">
              <p className="mr-4 text-xl font-bold text-white">Siguiente</p>
            </button>
            <button className="mx-3 my-2 mt-4 flex w-[300px] items-center justify-center rounded-full border-2  px-4 py-2 hover:bg-gray-300  dark:text-black dark:hover:bg-gray-300">
              <p className="mr-4 font-bold">¿Olvidaste tu contraseña?</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function ModalRegister({ setModalRegister }) {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="fixed top-20 mx-auto flex h-[650px] w-[600px] justify-center rounded-lg bg-white">
        <div className="mt-2">
          <button onClick={() => setModalRegister(false)}>
            {" "}
            <AiOutlineClose className="absolute left-2 top-4 h-6 w-6 text-black" />
          </button>

          <div className="flex items-center justify-center gap-4">
            <IoLogoTwitter className="h-10 w-10 text-blue-400" />
          </div>
          <div className="flex max-w-sm">
            <h2 className="text-4xl font-bold text-black ">
              Únete a Twitter hoy mismo
            </h2>
          </div>
          <div className="mt-12">
            <button
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              className="mx-3 my-2 flex  w-[300px] items-center justify-center rounded-full border-2 px-4 py-2 hover:bg-gray-300 dark:bg-gray-50 dark:text-black dark:hover:bg-gray-300"
            >
              <FcGoogle className="mr-5 h-6 w-6" />
              <p className="mr-4">Registrase con Google</p>
            </button>
            <button
              onClick={() => signIn("facebook", { callbackUrl: "/home" })}
              className="mx-3 mt-4 flex w-[300px] items-center justify-center rounded-full border-2 px-4 py-2 font-semibold text-black hover:bg-gray-300 dark:bg-gray-50 dark:text-black dark:hover:bg-gray-300"
            >
              <AiFillFacebook className="h-6 w-6" />
              <p className="ml-3">Registrarse con Facebook</p>
            </button>
            <button className="mx-3 my-2 mt-4 w-[300px] rounded-full border-2 px-4 py-2 font-semibold hover:bg-gray-300 dark:bg-gray-50 dark:text-black dark:hover:bg-gray-300">
              Crear cuenta
            </button>
          </div>
          <div className="my-4 ml-4 flex w-[300px] items-center">
            <hr className="flex-grow border"></hr>
            <span className="mx-4 text-gray-500">o</span>
            <hr className="flex-grow border"></hr>
          </div>
          <button className="mx-3 my-2 mt-4 flex w-[300px] items-center justify-center rounded-full border-2 bg-black px-4 py-2 hover:bg-gray-300  dark:text-black dark:hover:bg-gray-300">
            <p className="mr-4 text-xl font-bold text-white">Crear cuenta</p>
          </button>
          <div>
            <p className="m-2 w-[300px] text-sm  dark:text-gray-400">
              Al registrarte, aceptas los{" "}
              <strong className="text-blue-500">Términos de servicio</strong> y
              la{" "}
              <strong className="text-blue-500">Política de Privacidad</strong>,
              incluida la política de{" "}
              <strong className="text-blue-500">Uso de Cookies.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FooterUnauthenticated() {
  const [showModal, setShowModal] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);
  return (
    <>
      {" "}
      {showModal ? (
        <ModalLogin showModal={showModal} setShowModal={setShowModal} />
      ) : null}
      {modalRegister ? (
        <ModalRegister setModalRegister={setModalRegister} />
      ) : null}
      <div className="fixed bottom-0 flex h-[70px] w-full items-center bg-[#1D9BF0] ">
        <div className="ml-2 hidden w-full flex-col md:ml-16 md:flex lg:ml-32">
          <p className="text-1xl text-white sm:text-2xl ">
            No te pierdas lo que está pasando
          </p>
          <p className="text-sm text-white">
            Los usuarios de Twitter son los primeros en enterarse.
          </p>
        </div>
        <div className="flex h-full w-full items-center gap-4 ">
          <button
            onClick={() => [setShowModal(true), setModalRegister(false)]}
            className="w-full rounded-full border-2 border-white/20 p-2 font-semibold text-white hover:bg-gray-300 md:w-auto"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => [setShowModal(false), setModalRegister(true)]}
            className="w-full rounded-full border-2 border-white/20 bg-white p-2 font-semibold text-black hover:bg-gray-300 md:w-auto"
          >
            Regístrate
          </button>
        </div>
      </div>
    </>
  );
}
