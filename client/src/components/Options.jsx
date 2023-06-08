import { Popover, Transition } from '@headlessui/react';
import React, { useRef } from 'react'
import { ReportIcon, TrashIcon } from './icons';
import { SlOptions } from 'react-icons/sl';
import { useDeleteTweetMutation } from '@/redux/services/tweetsApi';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";

const Options = ({ user, author, _id, token }) => {
  const popperRef = useRef(null);
  const { data: session } = useSession();
  const { pathname, push, query } = useRouter();

  const [deleteTweet] = useDeleteTweetMutation()

  const onDelete = (close) => {
    if (pathname.includes("/home")) {
      deleteTweet({ id: _id, token: session.token }).then((res) => close()).catch((error) => console.log(error))
    }
    if (pathname.includes("/tweet") === query?.id === _id) {
      deleteTweet({ id: _id, token: session.token }).then((res) => push("/home")).catch((error) => console.log(error))
    }
  }
  return (
        <div className='w-auto flex items-center align-middle -ml-5 cursor-pointer hover:text-[#1d9bf0] group' onClick={(e) => e.stopPropagation()} >
            <Popover className="-mt-1 ml-auto">
                {({ close }) => (
                    <>
                        <Transition
                            enter="transition duration-200 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-95 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Popover.Panel className="dark:shadowtw absolute right-0 flex h-fit w-max flex-col overflow-hidden rounded-xl border bg-white font-medium dark:border-white/20 dark:bg-black dark:text-white">
                                {
                                    user?._id !== author?._id
                                      ? <button onClick={close} className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-bold transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                                            <ReportIcon size={20} /> Denunciar
                                        </button>
                                      : <button onClick={() => onDelete(close)} className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-bold text-red-600 transition duration-200 hover:bg-black/5 dark:hover:bg-white/10">
                                            <TrashIcon size={20} /> Eliminar
                                        </button>
                                }
                            </Popover.Panel>
                        </Transition>
                        <Popover.Button
                            className={"outline-none"}
                            ref={popperRef}
                        >
                            <SlOptions className='icons w-10 h-10 group-hover:bg-[#1C9BEF]/10' title='Mas opciones' />
                        </Popover.Button>
                    </>
                )}
            </Popover>
            </div>
  )
}

export default Options
