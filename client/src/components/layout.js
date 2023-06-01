import Darkmode from "@/components/darkmode";
import {
  AtIcon,
  AttachMessageIcon,
  BookmarkIcon,
  BookmarksIcon,
  ChevronUpIcon,
  CreateTweetIcon,
  EditIcon,
  ExploreIcon,
  HelpIcon,
  HomeIcon,
  ListIcon,
  MenuIcon,
  MessagesIcon,
  MoreIcon,
  NewMessageIcon,
  NotificationIcon,
  ProfileIcon,
  ReportIcon,
  SearchIcon,
  SettingsIcon,
  ShortcutsIcon,
  SilenceMessageIcon,
  TrashIcon,
  TwitterIcon,
  VerifiedIcon,
} from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { usePopper } from "react-popper";
import QuienSeguir from "./layoutComponents/QuienSeguir";
import QueEstaPasando from "./layoutComponents/QueEstaPasando";
import Login from "./layoutComponents/Login";
import FooterUnauthenticated from "./FooterUnauthenticated";
import { HiChevronRight } from "react-icons/hi";

function Header() {
  const { pathname } = useRouter();
  const { data: session, status } = useSession();
  const [openSettings, setOpenSettings] = useState(false);
  const [openUserPopper, setOpenUserPopper] = useState();
  const [popperUser, setPopperUser] = useState();
  const [openOptionPopper, setOpenOptionPopper] = useState();
  const [popperOptions, setPopperOptions] = useState();
  const { styles: userStyles, attributes: userAttributes } = usePopper(
    openUserPopper,
    popperUser,
    {
      placement: "top-end",
      modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
    },
  );

  const { styles: optionStyles, attributes: optionAttributes } = usePopper(
    openOptionPopper,
    popperOptions,
    {
      placement: "top",
      modifiers: [{ name: "offset", options: { offset: [0, -60] } }],
    },
  );

  return (
    <header className={"flex w-full justify-end md:w-24 lg:max-w-[300px] xl:w-full " + (pathname.includes("messages") ? "max-sm:hidden" : "")}>
      <div className="noscrollbar flex h-full min-w-max flex-col items-center gap-5 overflow-y-auto border-r-black/5 px-2 dark:border-r-white/20 max-md:w-full md:fixed md:border-r xl:w-[300px] xl:px-4">
        <div className="fixed top-0 flex w-full items-center justify-between border-b border-b-black/10 bg-white px-4 py-3 dark:border-b-white/20 dark:bg-black md:hidden">
          <Link href="/home">
            <TwitterIcon size={24} />
          </Link>

          <div className="group flex w-full max-w-[60%] items-center gap-1 overflow-hidden rounded-2xl border border-black/20 bg-slate-100/20 px-2 transition duration-200 focus-within:border-indigo-500 dark:border-white/20 dark:bg-slate-500/20  dark:focus-within:border-indigo-500">
            <button>
              <SearchIcon size={20} opacity={true} />
            </button>
            <input
              type="text"
              className="w-full bg-transparent py-1.5 text-sm outline-none"
              placeholder="Buscar en Twitter"
            ></input>
          </div>

          <button>
            <MenuIcon size={24} />
          </button>
        </div>

        <div className="hidden w-full flex-col gap-1.5 py-1 max-xl:items-center md:flex">
          <Link
            className="w-fit rounded-full p-3 transition duration-300 hover:bg-black/10 hover:dark:bg-white/10"
            href="/home"
          >
            <TwitterIcon size={28} />
          </Link>

          <Link
            href="/home"
            className={
              "flex w-fit items-center gap-4 rounded-3xl p-3 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 lg:pr-4 " +
              (pathname === "/" ? "font-bold" : "")
            }
          >
            <HomeIcon size={28} active={pathname === "/home"} />{" "}
            <p className="dark:text-white max-xl:hidden">Inicio</p>
          </Link>

          <Link
            href="/explore"
            className={
              "flex w-fit items-center gap-4 rounded-3xl p-3 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 lg:pr-4 " +
              (pathname === "/explore" ? "font-bold" : "")
            }
          >
            <ExploreIcon size={28} active={pathname === "/explore"} />{" "}
            <p className="dark:text-white max-xl:hidden">Explorar</p>
          </Link>

          <Link
            href="/notifications"
            className={
              "flex w-fit items-center gap-4 rounded-3xl p-3 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 lg:pr-4 " +
              (pathname === "/notifications" ? "font-bold" : "")
            }
          >
            <NotificationIcon
              size={28}
              active={pathname === "/notifications"}
            />{" "}
            <p className="dark:text-white max-xl:hidden">Notificaciones</p>
          </Link>

          <Link
            href="/messages"
            className={
              "flex w-fit items-center gap-4 rounded-3xl p-3 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 lg:pr-4 " +
              (pathname === "/messages" ? "font-bold" : "")
            }
          >
            <MessagesIcon size={28} active={pathname === "/messages"} />{" "}
            <p className="dark:text-white max-xl:hidden">Mensajes</p>
          </Link>

          <Link
            href="/lists"
            className={
              "flex w-fit items-center gap-4 rounded-3xl p-3 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 lg:pr-4 " +
              (pathname === "/lists" ? "font-bold" : "")
            }
          >
            <ListIcon size={28} active={pathname === "/lists"} />{" "}
            <p className="dark:text-white max-xl:hidden">Listas</p>
          </Link>

          <Link
            href="/bookmarks"
            className={
              "flex w-fit items-center gap-4 rounded-3xl p-3 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 lg:pr-4 " +
              (pathname === "/bookmarks" ? "font-bold" : "")
            }
          >
            <BookmarkIcon size={28} active={pathname === "/bookmarks"} />{" "}
            <p className="dark:text-white max-xl:hidden">Guardados</p>
          </Link>

          <Link
            href="/profile"
            className={
              "flex w-fit items-center gap-4 rounded-3xl p-3 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 lg:pr-4 " +
              (pathname === "/profile" ? "font-bold" : "")
            }
          >
            <ProfileIcon size={28} active={pathname === "/profile"} />{" "}
            <p className="dark:text-white max-xl:hidden">Perfil</p>
          </Link>

          {session ? (
            <Popover className="relative mt-auto w-full max-md:hidden">
              <Transition
                className="fixed"
                enter="transition duration-200 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-95 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel
                  ref={setPopperOptions}
                  style={optionStyles.popper}
                  {...optionAttributes.popper}
                  className="dark:shadowtw flex h-fit w-max flex-col items-start overflow-hidden rounded-xl border bg-white font-medium dark:border-white/20 dark:bg-black dark:text-white"
                >
                  <button className="flex w-full items-center gap-4 p-4 text-left text-xl font-bold transition duration-300 hover:bg-black/5 hover:dark:bg-white/10">
                    <AtIcon size={24} /> Conectar
                  </button>
                  <button className="flex w-full items-center gap-4 p-4 text-left text-xl font-bold transition duration-300 hover:bg-black/5 hover:dark:bg-white/10">
                    <BookmarksIcon size={24} /> Borradores
                  </button>
                  <button className="flex w-full items-center gap-4 p-4 text-left text-xl font-bold transition duration-300 hover:bg-black/5 hover:dark:bg-white/10">
                    <VerifiedIcon size={24} /> Organizaciones Verificadas
                  </button>
                  <hr className="mx-auto mt-0.5 h-1 w-[90%] opacity-50" />
                  <button
                    onClick={() => setOpenSettings(!openSettings)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left font-semibold transition duration-300 hover:bg-black/5 hover:dark:bg-white/10"
                  >
                    Configuración y Soporte{" "}
                    <ChevronUpIcon size={18} active={openSettings} />
                  </button>
                  <div
                    className={
                      "w-full transition-all duration-500 " +
                      (openSettings ? "h-[176px]" : "h-0 overflow-hidden")
                    }
                  >
                    <Link
                      href="/settings"
                      className="flex w-full items-center gap-4 p-4 py-2.5 text-left font-semibold transition duration-300 hover:bg-black/5 hover:dark:bg-white/10"
                    >
                      <SettingsIcon size={18} /> Configuración y Privacidad
                    </Link>
                    <button className="flex w-full items-center gap-4 p-4 py-2.5 text-left font-semibold transition duration-300 hover:bg-black/5 hover:dark:bg-white/10">
                      <HelpIcon size={18} /> Centro de Ayuda
                    </button>
                    <button className="flex w-full items-center gap-4 p-4 py-2.5 text-left font-semibold transition duration-300 hover:bg-black/5 hover:dark:bg-white/10">
                      <EditIcon size={18} /> Mostrar
                    </button>
                    <button className="flex w-full items-center gap-4 p-4 py-2.5 text-left font-semibold transition duration-300 hover:bg-black/5 hover:dark:bg-white/10">
                      <ShortcutsIcon size={18} /> Atajos de teclado
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>

              <Popover.Button
                ref={setOpenOptionPopper}
                className="flex w-fit items-center gap-4 rounded-3xl p-3 text-xl outline-none transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 lg:pr-4"
              >
                <MoreIcon size={28} />
                <p className="dark:text-white max-xl:hidden">Más opciones</p>
              </Popover.Button>
            </Popover>
          ) : null}

          {session && (
            <button className="mt-5 w-fit rounded-full bg-[#7855FF] p-3.5 transition duration-300 hover:bg-[#6c4de6] xl:w-[85%] xl:p-3">
              <div className="xl:hidden">
                <CreateTweetIcon size={24} />
              </div>
              <p className="text-lg font-semibold text-white max-xl:hidden">
                Twittear
              </p>
            </button>
          )}
        </div>

        {session ? (
          <Popover className="mt-auto w-full max-md:hidden">
            <Transition
              className="fixed w-[300px]"
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-95 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel
                ref={setPopperUser}
                style={userStyles.popper}
                {...userAttributes.popper}
                className="dark:shadowtw flex h-fit w-fit flex-col items-start rounded-xl border bg-white pb-1 pt-3 font-medium dark:border-white/20 dark:bg-black dark:text-white"
              >
                <button className="w-full px-4 py-2 text-left transition duration-300 hover:bg-black/5 hover:dark:bg-white/10">
                  Agregar una cuenta existente
                </button>
                <button
                  onClick={() => signOut()}
                  className="w-full px-4 py-2 text-left transition duration-300 hover:bg-black/5 hover:dark:bg-white/10"
                >
                  Cerrar la sesion de {session?.user?.name}
                </button>
                <div className="-my-1 h-3 w-3 origin-bottom-left rotate-45 transform border-b border-r bg-white dark:border-white/20 dark:bg-black max-xl:ml-5 xl:mx-auto"></div>
              </Popover.Panel>
            </Transition>

            <Popover.Button
              ref={setOpenUserPopper}
              className="mb-4 flex w-full cursor-pointer justify-between gap-4 rounded-full outline-none transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 max-xl:w-fit max-lg:mx-auto max-md:hidden lg:px-3 lg:py-2"
            >
              <div className="flex items-center gap-3">
                {!session?.user?.image || status === "loading" ? (
                  <svg
                    className="h-14 w-14 text-gray-200 dark:text-gray-700"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <Image
                    className="m-auto h-10 w-10 rounded-full object-cover"
                    src={
                      session.user
                        ? session.user.image
                        : "/img/defaultprofile.jpg"
                    }
                    width={50}
                    height={50}
                    alt="Foto de perfil"
                    unoptimized
                  />
                )}
                <div className="text-base max-xl:hidden">
                  <p className="max-w-[14ch] truncate font-semibold dark:text-white">
                    {session?.user?.name}
                  </p>
                  <p className="-mt-0.5 max-w-[14ch] truncate text-sm text-slate-500">
                    {session?.user?.email.split("@")[0]}
                  </p>
                </div>
              </div>
              <div className="my-auto max-xl:hidden">
                <MenuIcon size={16} />
              </div>
            </Popover.Button>
          </Popover>
        ) : null}
      </div>
    </header>
  );
}

function Footer() {
  const { pathname } = useRouter();
  const { status } = useSession();
  return (
    <>
      <nav className={"fixed inset-x-0 bottom-0 flex items-center justify-around border-t border-t-black/10 bg-white p-2 dark:border-t-white/20 dark:bg-black md:hidden " + (pathname.includes("messages/") ? "hidden" : "")}>
        <Link
          href="/home"
          className={
            "flex w-fit items-center gap-4 rounded-full p-2 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 " +
            (pathname === "/" ? "font-bold" : "")
          }
        >
          <HomeIcon size={28} active={pathname === "/"} />
        </Link>

        <Link
          href="/explore"
          className={
            "flex w-fit items-center gap-4 rounded-full p-2 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 " +
            (pathname === "/" ? "font-bold" : "")
          }
        >
          <SearchIcon size={28} active={pathname === "/explore"} />
        </Link>

        <Link
          href="/notifications"
          className={
            "flex w-fit items-center gap-4 rounded-full p-2 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 " +
            (pathname === "/" ? "font-bold" : "")
          }
        >
          <NotificationIcon size={28} active={pathname === "/notifications"} />
        </Link>

        <Link
          href="/messages"
          className={
            "flex w-fit items-center gap-4 rounded-full p-2 text-xl transition duration-300 hover:bg-black/10 hover:dark:bg-white/10 " +
            (pathname === "/" ? "font-bold" : "")
          }
        >
          <MessagesIcon size={28} active={pathname === "/messages"} />
        </Link>
      </nav>

      <footer className={"w-[350px] max-lg:hidden " + (pathname.includes("messages") || pathname.includes("settings") ? "md:hidden" : "")}>
        <div className="noscrollbar fixed flex max-w-[350px] flex-col gap-5 overflow-y-scroll border-l-black/5 px-4 dark:border-l-white/20 md:h-full md:border-l">
          <div className="sticky top-0 w-full bg-white py-1 dark:bg-black">
            <div className="group flex w-full items-center gap-3 overflow-hidden rounded-3xl border border-black/20 bg-slate-100/20 px-3 transition duration-200 focus-within:border-indigo-500 dark:border-white/20 dark:bg-slate-500/20 dark:focus-within:border-indigo-500">
              <button>
                <SearchIcon size={24} opacity={true} />
              </button>
              <input
                type="text"
                className="w-full bg-transparent py-2.5 outline-none"
                placeholder="Buscar en Twitter"
              ></input>
            </div>
          </div>
          <div>
            {status === "unauthenticated" ? (
              <Login />
            ) : (
              <div className="col-1 flex flex-col gap-2">
                <QueEstaPasando /> <QuienSeguir />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-[.75rem] font-medium dark:text-gray-500">
            <button className="hover:underline">Condiciones de Servicio</button>
            <button className="hover:underline">Política de Privacidad</button>
            <button className="hover:underline">Política de cookies</button>
            <button className="hover:underline">Accesibilidad</button>
            <button className="hover:underline">Información de anuncios</button>
            <button className="hover:underline">Más opciones...</button>
            <p>© 2023 X Corp.</p>
          </div>
          <div>
            <Darkmode />
          </div>
        </div>
      </footer>
    </>
  );
}

export default function Layout({ children }) {
  const { status } = useSession();
  const { pathname, asPath } = useRouter();
  const popperRef = useRef(null);

  const messages = [
    {
      id: 1,
      name: "elon musk",
    },
    {
      id: 2,
      name: "alex",
    },
  ];

  return (
    <>
      <div className="flex w-full justify-center max-md:flex-col">
        <Header />
        <main className={"noscrollbar w-full overflow-y-scroll h-full md:max-w-[600px] " + (pathname.includes("settings") || pathname.includes("messages") ? "order-2 " : "") + (pathname.includes("messages") ? "" : "max-md:my-16")}>
          {children}
        </main>
        {
          pathname.includes("settings") ? (
          <section
            className={
              "w-full py-4 md:max-w-[400px] " +
              (asPath === "/settings" ? "" : "max-md:hidden")
            }
          >
            <h2 className="mb-5 ml-3.5 text-2xl font-bold dark:text-white">
              Configuración
            </h2>
            <Link
              href="/settings/account"
              className={
                "flex w-full items-center justify-between p-4 transition duration-200 dark:text-white max-md:hidden " +
                (asPath === "/settings/account"
                  ? "bg-black/5 dark:bg-white/10"
                  : "hover:bg-black/5 hover:dark:bg-white/10")
              }
            >
              Tu cuenta <HiChevronRight size={24} />
            </Link>
            <Link
              href="/settings/privacy_and_safety"
              className={
                "flex w-full items-center justify-between p-4 transition duration-200 dark:text-white max-md:hidden " +
                (asPath === "/settings/privacy_and_safety"
                  ? "bg-black/5 dark:bg-white/10"
                  : "hover:bg-black/5 hover:dark:bg-white/10")
              }
            >
              Privacidad y seguridad <HiChevronRight size={24} />
            </Link>
            <Link
              href="/settings/account"
              className={
                "flex w-full items-center justify-between p-4 transition duration-200 dark:text-white md:hidden " +
                (asPath === "/settings/account"
                  ? "bg-black/5 dark:bg-white/10"
                  : "hover:bg-black/5 hover:dark:bg-white/10")
              }
            >
              Tu cuenta <HiChevronRight size={24} />
            </Link>
            <Link
              href="/settings/privacy_and_safety"
              className={
                "flex w-full items-center justify-between p-4 transition duration-200 dark:text-white md:hidden " +
                (asPath === "/settings/privacy_and_safety"
                  ? "bg-black/5 dark:bg-white/10"
                  : "hover:bg-black/5 hover:dark:bg-white/10")
              }
            >
              Privacidad y seguridad <HiChevronRight size={24} />
            </Link>
          </section>
          )
            : null
        }
        {
          pathname.includes("messages") ? (
          <section
            className={
              "flex w-full flex-col gap-4 py-4 lg:max-w-[400px] " +
              (asPath === "/messages" ? "" : "max-lg:hidden")
            }
          >
            <section className="flex flex-col gap-4">
              <div className="mx-auto flex w-[90%] flex-wrap items-center justify-between gap-2">
                <h2 className="text-2xl font-bold dark:text-white">Mensajes</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <button>
                    <SettingsIcon size={20} />
                  </button>
                  <button>
                    <NewMessageIcon size={20} />
                  </button>
                </div>
              </div>

              <div className="group mx-auto flex w-[90%] items-center gap-3 overflow-hidden rounded-3xl border border-black/20 bg-slate-100/20 px-3 transition duration-200 focus-within:border-indigo-500 dark:border-white/20 dark:bg-slate-500/20 dark:focus-within:border-indigo-500">
                <button>
                  <SearchIcon size={24} opacity={true} />
                </button>
                <input
                  type="text"
                  className="w-full bg-transparent py-2.5 outline-none"
                  placeholder="Buscar Mensajes Directos"
                ></input>
              </div>
            </section>

            <section className="flex w-full flex-col">
              {messages.map((e) => (
                <Link
                  href={"/messages/" + e.name}
                  key={e.id}
                  className="flex flex-wrap gap-4 p-3 hover:bg-black dark:hover:bg-white/10"
                >
                  <Image
                    className="h-14 w-14 rounded-full"
                    src="/img/defaultprofile.jpg"
                    width={50}
                    height={50}
                    alt="Foto de perfil"
                  />
                  <p className="font-bold dark:text-white">
                    {e.name} <small className="text-gray-400">@alexqs96.</small>
                  </p>

                  <Popover className="-mt-1 ml-auto">
                    <Transition
                      enter="transition duration-200 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-95 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Popover.Panel className="dark:shadowtw absolute right-0 flex h-fit w-max flex-col overflow-hidden rounded-xl border bg-white font-medium dark:border-white/20 dark:bg-black dark:text-white">
                        <button className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                          <AttachMessageIcon size={20} /> Fijar conversación
                        </button>
                        <button className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                          <SilenceMessageIcon size={20} /> Aplazar conversación
                        </button>
                        <button className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                          <ReportIcon size={20} /> Denunciar la conversación
                        </button>
                        <button className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-bold text-red-600 transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                          <TrashIcon size={20} /> Eliminar conversación
                        </button>
                      </Popover.Panel>
                    </Transition>

                    <Popover.Button
                      className="rounded-full p-2 outline-none transition duration-200 hover:bg-black/5 dark:hover:bg-white/10"
                      ref={popperRef}
                    >
                      <MenuIcon size={18} />
                    </Popover.Button>
                  </Popover>
                </Link>
              ))}
            </section>
          </section>
          )
            : null
        }
        <>
          <Footer />
          {status === "unauthenticated" ? <FooterUnauthenticated /> : null}
        </>
      </div>
    </>
  );
}
