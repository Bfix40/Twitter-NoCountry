import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { BsThreeDots } from "react-icons/bs"
import { HiArrowLeft } from "react-icons/hi"
import { HiCalendarDays } from "react-icons/hi2"
import { Popover, Transition, Dialog } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useEffect, useState } from "react"
import { BlockIcon, ListIcon, ManageListIcon, MessagesIcon, MomentsIcon, NotifyIcon, ReportIcon, SilenceIcon, SubjectsIcon, UrlIcon } from "./icons"
import { IoLocationOutline } from "react-icons/io5"
import { IoMdLink } from "react-icons/io"
import { useUnFollowUserMutation, useFollowUserMutation } from "@/redux/services/usersApi"
import Splash from "./splash"
import { formatDate } from "../../utils/formatoFechas"

const ProfileSection = ({ session, profile }) => {
  const [unfollowUser] = useUnFollowUserMutation();
  const [followUser] = useFollowUserMutation();
  const [follow, setFollow] = useState(false)
  const [openImageBG, setOpenImageBG] = useState(false)
  const [openImage, setOpenImage] = useState(false)
  const { pathname, query, back } = useRouter()
  const [openOptionPopper, setOpenOptionPopper] = useState();
  const [popperOptions, setPopperOptions] = useState();
  const { styles: optionStyles, attributes: optionAttributes } = usePopper(
    openOptionPopper,
    popperOptions,
    {
      placement: "bottom-start",
      modifiers: [{ name: "offset", options: { offset: [0, -40] } }],
    }
  );

  const onClickFollowUser = async (id) => {
    const res = await followUser({ userId: id, token: session.token });
    if (res.data) {
      setFollow(true)
    }
  };

  const onClickUnFollowUser = async (id) => {
    const res = await unfollowUser({ userId: id, token: session.token });
    if (res.data) {
      setFollow(false)
    }
  };

  useEffect(() => {
    if (session?.user?.following) {
      const userfound = session.user.following.some((user) => user._id === profile?.user?._id);
      setFollow(userfound);
    }
  }, [session?.user?.following, profile?.user]);

  if (!profile.user) {
    return <Splash />
  }

  return (
    <>
    <section>
    <Transition
        show={openImageBG}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
      <Dialog open={openImageBG} onClose={() => setOpenImageBG(false)}>
        <Dialog.Panel className="h-full w-full bg-black/60 grid absolute inset-0" onClick={() => setOpenImageBG(false)}>
        <button onClick={() => setOpenImageBG(false)} className="left-5 top-5 absolute text-white py-2 px-4 rounded-full transition outline-none duration-200 hover:bg-white/10 text-2xl">X</button>
        <Image
          className="m-auto h-4/6 w-4/6"
          src={
            profile?.user?.background ? profile?.user?.background : "/img/bg_pattern.png"
          }
          width={200}
          height={200}
          alt="Fondo de Perfil"
        />
        </Dialog.Panel>
      </Dialog>
      </Transition>
      <Transition
        show={openImage}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
      <Dialog open={openImage} onClose={() => setOpenImage(false)}>
        <Dialog.Panel className="h-full w-full bg-black/60 grid absolute inset-0" onClick={() => setOpenImage(false)}>
        <button onClick={() => setOpenImage(false)} className="left-5 top-5 absolute text-white py-2 px-4 rounded-full transition outline-none duration-200 hover:bg-white/10 text-2xl">X</button>
        <Image
          className="m-auto h-2/5 w-2/5 object-contain"
          src={
            profile?.user?.image ? profile?.user?.image : "/img/defaultprofile.jpg"
          }
          width={400}
          height={400}
          alt="Foto de perfil"
        />
        </Dialog.Panel>
      </Dialog>
      </Transition>
      <div className="flex items-center gap-4 dark:text-white py-1 px-5 sticky top-0 z-20 backdrop-blur-md">
        <button
          onClick={() => back()}
        >
          <HiArrowLeft size={20} />
        </button>
        <div>
          <p className="font-bold text-lg">{profile?.user?.name ? profile?.user?.name : "elonmusk"}</p>
          {
            pathname.includes("with_replies")
              ? <p className="text-sm text-gray-400">{profile?.user?.replies?.length ? profile?.user?.replies.length : 0} Respuestas</p>
              : pathname.includes("media")
                ? <p className="text-sm text-gray-400">{profile?.user?.media?.length ? profile?.user?.media.length : 0} Fotos y videos</p>
                : pathname.includes("likes")
                  ? <p className="text-sm text-gray-400">{profile?.user?.likes?.length ? profile?.user?.likes.length : 0} Me gusta</p>
                  : <p className="text-sm text-gray-400">{profile?.user?.tweets?.length ? profile?.user?.tweets.length : 0} Tweets</p>
          }

        </div>
      </div>

      <Image
        onClick={() => setOpenImageBG(!openImageBG)}
        className="h-[200px] w-full object-cover cursor-pointer"
        src={
          profile?.user?.background ? profile?.user?.background : "/img/bg_pattern.png"
        }
        width={200}
        height={200}
        alt="Fondo de Perfil"
      />

      <div className="h-fit dark:text-white w-[95%] mx-auto">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between flex-wrap items-center gap-4">
          <Image
            onClick={() => setOpenImage(!openImage)}
            className="h-32 w-32 -mt-16 object-cover rounded-full border-4 border-white dark:border-black cursor-pointer"
            src={
              profile?.user?.image ? profile?.user?.image : "/img/defaultprofile.jpg"
            }
            width={100}
            height={100}
            alt="Foto de perfil"
          />

          {
            profile
              ? profile?.user?.username === session?.user?.username
                ? <Link href="/settings/account/your_twitter_data" className="hover:bg-black/5 dark:hover:bg-white/10 transition duration-200 border rounded-3xl border-black/20 py-1.5 px-3.5 font-semibold dark:border-white/30 dark:text-white w-fit h-fit">
              Editar Perfil
            </Link>
                : <div className="ml-auto flex items-center gap-2 flex-wrap">
                  <Popover>
                  <Transition
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
                      className="dark:shadowtw flex h-fit w-max flex-col overflow-hidden rounded-xl border bg-white font-medium dark:border-white/20 dark:bg-black dark:text-white"
                    >
                      <button className="flex items-center gap-2 w-full text-left py-2.5 px-4 font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                        <SubjectsIcon size={20} /> Ver Temas
                      </button>
                      <button className="flex items-center gap-2 w-full text-left py-2.5 px-4 font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                        <ManageListIcon size={20} /> Agregar/eliminar a @{query.profile} en Listas
                      </button>
                      <button className="flex items-center gap-2 w-full text-left py-2.5 px-4 font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                        <ListIcon size={20} /> Ver Listas
                      </button>
                      <button className="flex items-center gap-2 w-full text-left py-2.5 px-4 font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                        <MomentsIcon size={20} /> Ver Momentos
                      </button>
                      <button className="flex items-center gap-2 w-full text-left py-2.5 px-4 font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                        <UrlIcon size={20} /> Copiar enlace al perfil
                      </button>
                      <button className="flex items-center gap-2 w-full text-left py-2.5 px-4 font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                        <SilenceIcon size={20} /> Silenciar a @{query.profile}
                      </button>
                      <button className="flex items-center gap-2 w-full text-left py-2.5 px-4 font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                        <BlockIcon size={20} /> Bloquear a @{query.profile}
                      </button>
                      <button className="flex items-center gap-2 w-full text-left py-2.5 px-4 font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                        <ReportIcon size={20} /> Denunciar a @{query.profile}
                      </button>
                    </Popover.Panel>
                  </Transition>

                  <Popover.Button
                    className="w-fit border outline-none border-black/5 dark:border-white/20 p-2 rounded-full"
                    ref={setOpenOptionPopper}
                  >
                    <BsThreeDots size={22} />
                  </Popover.Button>
                  </Popover>

                  {
                    profile.user && session?.user
                      ? profile.user?.username !== session?.user?.username
                        ? <>
                    <Link href={"/messages/" + profile?.user?.username} className="w-fit border outline-none border-black/5 dark:border-white/20 p-2 rounded-full">
                      <MessagesIcon size={22} />
                    </Link>

                    <button className="w-fit border outline-none border-black/5 dark:border-white/20 p-2 rounded-full">
                      <NotifyIcon size={22} />
                    </button>

                    <button
                      onClick={() => (follow ? onClickUnFollowUser(profile.user._id) : onClickFollowUser(profile.user._id))}
                      className={(follow ? "hover:border-red-600 hover:bg-red-600/30 dark:hover:border-red-600 dark:hover:bg-red-600/30 hover:text-red-600 dark:hover:text-red-600" : "hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white") + " group border transition duration-200 rounded-3xl border-black bg-black dark:bg-white py-1.5 px-3.5 font-semibold dark:border-white text-white dark:text-black w-fit h-fit"}
                    >
                      <p className={(follow ? "group-hover:hidden" : "")}>{follow ? "Siguiendo" : "Seguir"}</p>
                      <p className={(follow ? "group-hover:block" : "") + " hidden"}>Dejar de Seguir</p>
                    </button>
                    </>
                        : null
                      : null
                  }
                </div>
              : null
          }
          </div>

          <p className="font-bold text-lg">{profile?.user?.name ? profile?.user?.name : "elonmusk"}</p>
          <p className="max-w-[24ch] -mt-2.5 truncate text-sm text-slate-500">
            @{profile?.user?.username ? profile?.user?.username : "elonmusk"}
          </p>

          <p>{profile?.user?.bio}</p>

          <div className="flex items-center gap-2 flex-wrap">
            {
              profile?.user?.location
                ? <p className="flex items-center gap-1 capitalize"><IoLocationOutline size={18} className="text-gray-400" />{profile?.user?.location}</p>
                : null
            }
            {
              profile?.user?.website
                ? <a href={profile.user.website} target="_blank" rel="noreferrer noopener" className="flex items-center gap-1"><IoMdLink className="rotate-45" size={18} /><span className="text-indigo-500">{profile?.user?.website}</span></a>
                : null
            }

            <p className="flex items-center gap-1 text-gray-400"><HiCalendarDays size={18}/> Se unió en {profile?.user?.createdAt ? formatDate(profile.user.createdAt) : "marzo de 2023" }</p>

          </div>

          <div className="flex items-center gap-4 dark:text-white">
            <Link
              className="flex items-center gap-2"
              href={"/" + (profile?.user?.username ? profile?.user?.username : "elonmusk") + "/following"}
            >
              {profile?.user?.following ? profile?.user?.following.length : 0} <p className="text-gray-400">Siguiendo</p>
            </Link>

            <Link
              className="flex items-center gap-2"
              href={"/" + (profile?.user?.username ? profile?.user?.username : "elonmusk") + "/followers"}
            >
              {profile?.user?.followers ? profile?.user?.followers.length : 0} <p className="text-gray-400">Seguidores</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-gray-400 mt-4 flex overflow-x-scroll">
        <Link href={"/" + (profile?.user?.username ? profile?.user?.username : "elonmusk")} className="w-full px-4 whitespace-pre hover:bg-black/5 dark:hover:bg-white/20 font-bold transition duration-300">
          <p className={"border-b-4 w-fit mx-auto py-3 " + (pathname === "/[profile]" ? "border-b-indigo-500 dark:text-white text-black" : "border-b-transparent")}>Tweets</p>
        </Link>
        <Link href={"/" + (profile?.user?.username ? profile?.user?.username : "elonmusk") + "/with_replies"} className="w-full px-4 whitespace-pre hover:bg-black/5 dark:hover:bg-white/20 font-bold transition duration-300">
          <p className={"border-b-4 w-fit mx-auto py-3 " + (pathname.includes("with_replies") ? "border-b-indigo-500 dark:text-white text-black" : "border-b-transparent")}>Respuestas</p>
        </Link>
        <Link href={"/" + (profile?.user?.username ? profile?.user?.username : "elonmusk") + "/media"} className="w-full px-4 whitespace-pre hover:bg-black/5 dark:hover:bg-white/20 font-bold transition duration-300">
          <p className={"border-b-4 w-fit mx-auto py-3 " + (pathname.includes("/media") ? "border-b-indigo-500 dark:text-white text-black" : "border-b-transparent")}>Fotos y videos</p>
        </Link>
        <Link href={"/" + (profile?.user?.username ? profile?.user?.username : "elonmusk") + "/likes"} className="w-full px-4 whitespace-pre hover:bg-black/5 dark:hover:bg-white/20 font-bold transition duration-300">
          <p className={"border-b-4 w-fit mx-auto py-3 " + (pathname.includes("/likes") ? "border-b-indigo-500 dark:text-white text-black" : "border-b-transparent")}>Me gusta</p>
        </Link>
      </div>
      <hr className='border-black/5 -mt-4 dark:border-white/20'></hr>
    </section>
    </>
  )
}

export default ProfileSection
