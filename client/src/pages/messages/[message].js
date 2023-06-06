import { fetchMessages } from '@/redux/features/messagesSlice'
import { useGetUserByIdQuery } from '@/redux/services/usersApi'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Children, useEffect, useRef, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { HiArrowLeft, HiEmojiHappy } from 'react-icons/hi'
import { HiGif } from 'react-icons/hi2'
import { IoImage } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import io from "socket.io-client"
import { API_URL } from '../../../utils/api'
let socket

const Message = () => {
  const dispatch = useDispatch();
  const msgBox = useRef(null)
  const newMessage = useRef(null)
  const [messages, setMessages] = useState([])
  const { data: session } = useSession()
  const { query } = useRouter()
  const { data: profile } = useGetUserByIdQuery(query.message)

  function handleResizeInput(e) {
    if (e.target.value.length < 50) {
      document.querySelector(".msguser").style.height = "auto"
      document.querySelector('.msgbox').style.marginBottom = "80px"
    } else if (e.target.scrollHeight > 40 && e.target.scrollHeight <= 140) {
      document.querySelector(".msguser").style.height = e.target.scrollHeight + "px"
      document.querySelector('.msgbox').style.marginBottom = 40 + e.target.scrollHeight + "px"
    }

    return null
  }

  const loadMessages = async () => {
    try {
      if (session?.user?._id && profile?._id) {
        const response = await fetch(`${API_URL}/api/messages?senderId=${session?.user?._id}&receiverId=${profile?._id}&timestamp=${new Date().getTime()}`, {
          method: "GET",
          headers: {
            'content-type': 'application/json'
          },
          credentials: 'include'
        });
        if (response) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Error al cargar los mensajes. Código de respuesta:', response.status);
        }
      }
    } catch (error) {
      console.error('Error al cargar los mensajes:', error);
    }
  }

  const sendMessage = () => {
    const messageData = {
      senderId: session?.user?._id,
      receiverId: profile?._id,
      message: newMessage.current.value,
      details: {
        sender: session?.user,
        receiver: profile,
        lastmessage: newMessage.current.value,
        time: new Date().toISOString()
      }
    };

    // Enviar mensaje al servidor
    socket.emit('sendMessage', messageData);

    // Limpiar el campo de entrada de mensajes
    newMessage.current.value = ""
  };

  useEffect(() => {
    if (session?.user?._id) {
      socket = io(API_URL)
      // Cargar mensajes iniciales
      loadMessages()

      // Recibir nuevos mensajes
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message])
      });

      // Volver a solicitar los mensajes
      socket.on('updateMessages', () => {
        loadMessages()
        dispatch(fetchMessages(session.token))
      })

      socket.emit('joinChat', profile?._id)
      console.log("Conectado a SocketIo");

      return () => {
        socket.emit('leaveChat', profile?._id)
        socket.off('receiveMessage')
      }
    }
  }, [session?.user, profile?._id])

  useEffect(() => {
    msgBox.current.scrollTop = msgBox.current.scrollHeight
  }, [messages])

  return (
    <>
    <Head>
      <title>@{query?.message} / Twitter</title>
    </Head>
    <section ref={msgBox} className='scroll-smooth dark:text-white md:border-x border-x-black/5 dark:border-x-white/20 w-full h-full md:max-w-[570px] relative overflow-y-scroll'>
      <div className='flex justify-between items-center p-5 w-full dark:text-white backdrop-blur-md sticky top-0'>
        <Link href="/messages"><HiArrowLeft size={24} /></Link>
        <div className='flex items-center gap-3 font-bold text-lg'>
          <Image
            className="h-9 w-9 object-cover rounded-full"
            src={profile?.image ? profile.image : "/img/defaultprofile.jpg"}
            width={100}
            height={100}
            alt="Foto de perfil de Usuario"
          />
          {profile?.name}
        </div>
        <span className='w-6'></span>
      </div>
      <Link href={"/" + profile?.username} className="flex flex-col w-[95%] rounded-xl mx-auto my-2 pt-5 pb-10 items-center text-center justify-center transition duration-300 hover:bg-black/[3%] dark:hover:bg-white/10 dark:text-white">
        <Image
          className="h-20 w-20 object-cover rounded-full border-4 border-white dark:border-black cursor-pointer"
          src={profile?.image ? profile.image : "/img/defaultprofile.jpg"}
          width={100}
          height={100}
          alt="Foto de perfil de Usuario"
        />
        <h2 className='text-xl font-bold'>{profile?.name}</h2>
        <h3 className='text-gray-400 mb-4'>@{profile?.username}</h3>

        <p>{profile?.bio}</p>
        <p>Se unio en {profile?.createdAt ? profile?.createdAt : "2 de marzo"} - {profile?.followers?.length} Seguidores</p>
      </Link>
      <hr className='border-black/5 dark:border-white/20 w-[95%] mx-auto'></hr>

      <section className='w-[95%] mx-auto flex flex-col gap-4 pt-4 mb-20 flex-1 msgbox'>
        {
        messages.length
          ? Children.toArray(
            messages.map((message) => (
              <p className={(message.senderId === session?.user?._id ? "ml-auto bg-indigo-500" : "mr-auto bg-blue-500") + " py-2 px-3 rounded-3xl break-words max-w-full text-white w-fit"}>{message.message}</p>
            ))
          )
          : null
      }
      </section>

      <section className='max-h-[150px] fixed bg-white dark:bg-black w-full md:max-w-[570px] bottom-0 border-t border-r border-black/5 dark:border-white/20'>
        <div className='msguser dark:text-white flex items-center gap-4 px-4 bg-black/5 dark:bg-white/10 w-[96%] mx-auto my-2 rounded-xl'>
          <div className='flex items-center gap-2 py-2'>
            <button><IoImage size={18} className='text-indigo-500' /></button>
            <button><HiGif size={18} className='text-indigo-500' /></button>
            <button><HiEmojiHappy size={18} className='text-indigo-500' /></button>
          </div>
          <textarea
            ref={newMessage}
            placeholder='Escribe un mensaje'
            className='bg-transparent outline-none h-6 min-h-full w-full overflow-y-scroll resize-none'
            onChange={(e) => handleResizeInput(e)}
            onKeyDown={(e) => {
              e.key === "Enter" && !e.shiftKey && sendMessage()
            }}
          />
          <button onClick={() => sendMessage()}><BiSend size={18} className='text-indigo-500' /></button>
        </div>
      </section>
    </section>
    </>
  )
}

export default Message
