/* eslint-disable indent */
import React, { useState } from "react";
import { IoImageOutline, IoCloseOutline } from "react-icons/io5";
import { HiOutlineGif } from "react-icons/hi2";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { BiCalendar, BiMap } from "react-icons/bi";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useCreateTweetMutation } from "@/redux/services/tweetsApi";
import { useSession } from "next-auth/react";
import Pie from "./Circle";
// import { useRouter } from "next/router";
import { obtenerHashtags } from "../../utils/functions";
import ModalWarning from "./ModalWarning";

const Post = () => {
  const { data: session, status } = useSession();
  const [tweetText, setTweetText] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [files, setFiles] = useState([]);
  const [createTweet] = useCreateTweetMutation();
  const [warning, setWarning] = useState({})
  const [modal, setModal] = useState(false)

  const handleTweetChange = (event) => {
    const content = event.target.value
    if (content.length <= 300) {
      setTweetText(content);
    } else {
      setTweetText(content.slice(0, 300));
    }
  };

  const handleTweetSubmit = async (event) => {
    event.preventDefault();
    const body = new FormData();
    if (files.length !== 0) {
      body.append("images", files[0].file);
    }

    if (tweetText.length !== 0 || files.length !== 0) {
      body.append("content", tweetText);
      body.append("hashtags", obtenerHashtags(tweetText));
      await createTweet({ body, token: session.token }).then(async res => {
        if (!res.data?.message) {
          setTweetText("");
          setFiles([]);
          setUbicacion("");
        } else {
          await setWarning(res.data)
          setModal(true)
        }
      });
    }
  };

  const confirmSubmit = async () => {
    if (tweetText.length !== 0 || files.length !== 0) {
      const body = new FormData();
    if (files.length !== 0) {
      body.append("images", files[0].file);
    }
    body.append("content", tweetText);
    body.append("hashtags", obtenerHashtags(tweetText));
    body.append("confirmation", true);
    await createTweet({ body, token: session.token });
    setTweetText("");
    setFiles([]);
    setUbicacion("");
    setModal(false)
  }
  }
  return (
    <div className="h-auto w-full border-b border-black/5 dark:border-white/20 dark:bg-black dark:text-[#e7e9ea]">
      <div className="p-4 max-sm:px-1">
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
              id="tweet"
              className=" max-sm:my-0 w-full h-[80px] resize-none p-2 bg-transparent text-xl max-sm:text-base focus:outline-none dark:text-white"
              placeholder="¿Qué está pasando?"
              value={tweetText}
              onChange={handleTweetChange}
            />

            <div className={`grid max-h-fit ${files.length ? "" : "hidden"} w-auto grid-cols-2 gap-2 py-2 max-sm:py-0`}>
              {files.map((file) => (
                <div className="relative" key={file.id}>
                  <IoCloseOutline
                    onClick={() =>
                      setFiles(files.filter((el) => el.id !== file.id))
                    }
                    className="z-[5] absolute left-0 top-0 m-1 h-9 w-9 cursor-pointer rounded-full bg-black/70 p-2 text-white backdrop-blur-lg hover:bg-black/60"
                    title="Eliminar"
                  />
                  {file.file.type.startsWith("image/") ? (
                    <Image
                      width={250}
                      height={320}
                      key={file.id}
                      src={URL.createObjectURL(file.file)}
                      alt={file.file.name}
                      className="max-h-80 max-sm:max-h-60 w-full rounded-2xl object-cover "
                    />
                  ) : (
                    <video
                      key={file.name}
                      src={URL.createObjectURL(file.file)}
                      alt={file.name}
                      className="max-h-80 max-sm:max-h-60 w-full z-[3] relative rounded-2xl object-cover "
                      controls
                    />
                  )}
                </div>
              ))}
            </div>

            <div className={`my-2 w-full justify-end border-b border-black/5 py-2 dark:border-white/20`}>
              {ubicacion.length ? (
                <span
                  onClick={() => setUbicacion("")}
                  className="inline-flex cursor-pointer items-center max-sm:text-xs rounded-full bg-[#1C9BEF]/20 px-2 py-1 font-semibold text-[#1C9BEF] hover:bg-[#ff1100]/30 hover:text-[#ff1100]/80"
                >
                  {" "}
                  <BiMap className="mr-1" title="Etiquetar ubicacion" />{" "}
                  {ubicacion}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-row justify-between ">
              <div className="flex w-auto items-center gap-1 max-sm:gap-0">
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

              <span className="px-1 ml-auto my-auto"><Pie percentage={tweetText.length} colour={"#1a8cd8"} size={48} /></span>

              <button
                className="duration-400 rounded-full max-sm:text-xs bg-[#1d9bf0] max-sm:px-3 px-4 font-semibold text-white transition-opacity hover:bg-[#1a8cd8] disabled:cursor-not-allowed disabled:bg-[#1a8cd8] disabled:opacity-70"
                type="submit"
                disabled={(!tweetText.length && !files.length) || tweetText.length > 280}
                onClick={handleTweetSubmit}
              >
                Twittear
              </button>
              {
                modal ? <ModalWarning close={() => setModal(false)} confirmSubmit={confirmSubmit} forbiddenWords={warning.forbiddenWords} /> : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileUploader = ({ files, setFiles }) => {
  const onDrop = (acceptedFiles) => {
    // Limit the number of files to 2
    if (files.length === 2) {
      return alert("Solo se puede un max 2 fotos y videos");
    }

    const updatedFiles = [
      ...files,
      ...acceptedFiles.slice(0, 2 - files.length).map((element) => ({
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
      console.log("Geolocation API is not available in your browser!");
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
          )
            .then((res) => res.json())
            .then((prueba) => {
                console.log(prueba)
                setUbicacion(`${prueba.address.city || prueba.address.state}, ${prueba.address.country}`)
              }
            );
        },
        (error) => {
          console.log(error.message);
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

export default Post;
