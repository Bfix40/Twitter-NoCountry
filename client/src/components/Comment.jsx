/* eslint-disable indent */
import React, { useState } from "react";
import { IoImageOutline, IoCloseOutline } from "react-icons/io5";
import { HiOutlineGif } from "react-icons/hi2";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { BiCalendar, BiMap } from "react-icons/bi";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useCreateCommentTweetMutation } from "@/redux/services/tweetsApi";
import { useSession } from "next-auth/react";

const Comment = ({ tweetId, closeModal }) => {
  const { data: session, status } = useSession();
  const [tweetText, setTweetText] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [files, setFiles] = useState([]);
  const [createCommentTweet, { isLoading, isError }] = useCreateCommentTweetMutation();

  const handleTweetChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleTweetSubmit = async (event) => {
    event.preventDefault();

    if (tweetText.length !== 0) {
    const body = {
        content: tweetText,
        tweetId,
        hashtags: ["Tweet"]
    }
      await createCommentTweet({ body, token: session.token });
      setTweetText("");
      setFiles([]);
      setUbicacion("");
      if (!isLoading && !isError) {
        closeModal()
    }
    if (isError) alert(isError)
    }
  };
  return (
    <div className="h-auto w-full  dark:bg-black bg-white dark:text-[#e7e9ea]">
      <div className="">
        <div className="flex w-full items-start">
          <div className="flex-shrink-0">
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
                width={250}
                height={320}
                src={session.user.image}
                alt="Profile"
                className="h-12 w-12 rounded-full"
              />
            )}
          </div>
          <div className="ml-3 w-full flex-row ">
            <textarea
              className="my-2 w-full resize-none bg-transparent text-xl focus:outline-none text-black dark:text-white"
              placeholder="¡Twittea tu respuesta!"
              value={tweetText}
              onChange={handleTweetChange}
            />

            <div className="grid max-h-fit w-auto grid-cols-2 gap-2 py-2">
              {files.map((file) => (
                <div className="relative" key={file.id}>
                  <IoCloseOutline
                    onClick={() =>
                      setFiles(files.filter((el) => el.id !== file.id))
                    }
                    className="z-5 absolute left-0 top-0 m-1 h-9 w-9 cursor-pointer rounded-full bg-black/70 p-2 text-white backdrop-blur-lg hover:bg-black/60"
                    title="Eliminar"
                  />
                  {file.file.type.startsWith("image/") ? (
                    <Image
                      width={250}
                      height={320}
                      key={file.id}
                      src={URL.createObjectURL(file.file)}
                      alt={file.file.name}
                      className="max-h-80 w-full rounded-2xl object-cover "
                    />
                  ) : (
                    <video
                      key={file.name}
                      src={URL.createObjectURL(file.file)}
                      alt={file.name}
                      className="max-h-80 w-full rounded-2xl object-cover "
                      controls
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="my-2 w-full justify-end py-2 ">
              {ubicacion.length ? (
                <span
                  onClick={() => setUbicacion("")}
                  className="inline-flex cursor-pointer items-center rounded-full bg-[#1C9BEF]/20 px-2 py-1 font-semibold text-[#1C9BEF] hover:bg-[#ff1100]/30 hover:text-[#ff1100]/80"
                >
                  {" "}
                  <BiMap className="mr-1" title="Etiquetar ubicacion" />{" "}
                  {ubicacion}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between ">
              <div className="flex w-full items-center gap-1">
                <FileUploader files={files} setFiles={setFiles} />
                <div className="group flex cursor-pointer items-center space-x-1 align-middle text-[#1C9BEF]">
                  <HiOutlineGif
                    className="icons group-hover:bg-[#1C9BEF]/10 "
                    title="Gif"
                  />
                </div>
                <div className="group flex cursor-pointer items-center space-x-1 align-middle text-[#1C9BEF]">
                  <AiOutlineUnorderedList
                    className="icons group-hover:bg-[#1C9BEF]/10 "
                    title="Encuesta"
                  />
                </div>
                <div className="group flex cursor-pointer items-center space-x-1 align-middle text-[#1C9BEF]">
                  <BsEmojiSmile
                    className="icons group-hover:bg-[#1C9BEF]/10 "
                    title="Emoji"
                  />
                </div>
                <div className="group flex cursor-pointer items-center space-x-1 align-middle text-[#1C9BEF]">
                  <BiCalendar
                    className="icons group-hover:bg-[#1C9BEF]/10 "
                    title="Programacion"
                  />
                </div>
                <Ubicacion setUbicacion={setUbicacion} />
              </div>
              <button
                className="duration-400 rounded-full bg-[#1d9bf0] px-4 font-semibold text-white transition-opacity hover:bg-[#1a8cd8] disabled:cursor-not-allowed disabled:bg-[#1a8cd8] disabled:opacity-70"
                type="submit"
                disabled={!tweetText.length && !files.length}
                onClick={handleTweetSubmit}
              >
                Responder
              </button>
            </div>
    </div>
  );
};

const FileUploader = ({ files, setFiles }) => {
  const onDrop = (acceptedFiles) => {
    // Limit the number of files to 1
    if (files.length === 1) {
      return alert("Solo se puede un max 1 fotos");
    }

    const updatedFiles = [
      ...files,
      ...acceptedFiles.slice(0, 1 - files.length).map((element) => ({
        file: element,
        id: Math.floor(Date.now() + (Math.random() * 100 + 1)),
      })),
    ];
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="group flex cursor-pointer items-center space-x-1 align-middle text-[#1C9BEF]"
      {...getRootProps()}
    >
      <input {...getInputProps()} accept="image/*,video/*" multiple={true} />
      <IoImageOutline
        className="icons group-hover:bg-[#1C9BEF]/10"
        title="Fotos y Videos"
      />
    </div>
  );
};

const Ubicacion = ({ setUbicacion }) => {
  const geolocationAPI = navigator.geolocation;
  const getUserCoordinates = async () => {
    if (!geolocationAPI) {
      alert("Geolocation API is not available in your browser!");
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
          )
            .then((res) => res.json())
            .then((prueba) =>
              setUbicacion(`${prueba.address.city}, ${prueba.address.country}`)
            );
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  };
  //
  return (
    <div
      onClick={getUserCoordinates}
      className="group flex cursor-pointer items-center space-x-1 align-middle text-[#1C9BEF]"
    >
      <BiMap
        className="icons group-hover:bg-[#1C9BEF]/10 "
        title="Etiquetar ubicacion"
      />
    </div>
  );
};

export default Comment;
