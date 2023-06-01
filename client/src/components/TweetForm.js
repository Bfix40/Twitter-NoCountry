import { useDropzone } from "react-dropzone";

import { useState } from "react";
import { useSession } from "next-auth/react";
export default function TweetForm({
  base64,
  setBase64,
  profileImage,
  setText,
}) {
  const [tweet, setTweet] = useState("");
 
  const { data: session } = useSession();

  async function uploadTweet(e) {
    e.preventDefault();
    const response = await fetch("/api/tweets", {
      method: "POST",
      body: JSON.stringify({
        tweet,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log(responseData);
  }
  function handleDrop(files) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setBase64(e.target.result); // base64 string
    };
    reader.readAsDataURL(file);
  }
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  return (
    <form onSubmit={uploadTweet}>
      <input
        onChange={(e) => setTweet(e.target.value)}
        className=" w-full "
        type="text"
        placeholder="What's happening?"
      />
      <button
        type="submit"
        className="dark:bg-neutral-950 bg-blue-900 text-white rounded-full p-2"
      >
        Tweet
      </button>
    </form>
  );
}

/* <div className="w-full border-b border-neutral-600 pl-4 pr-6 py-6 flex">
      <div className="w-16 shrink-0 grow-0 mr-2 flex flex-col items-center">
        <Image
          className="rounded-full h-12 w-12"
          src={profileImage}
          height={1000}
          width={1000}
          alt="profile pic"
        />
      </div>
      <div className="flex flex-col gap-4 flex-grow items-stretch dark:text-white">
        <div
          onBlur={(e) => setText(e.target.innerHTML)}
          contentEditable
          suppressContentEditableWarning
          className="w-full text-lg outline-none mb-4"
        ></div>
        {base64 ? (
          <div className="relative mb-4">
            <div className="absolute top-4 right-4 flex items-center justify-center rounded-full bg-neutral-950 bg-opacity-50 hover:bg-opacity-40 cursor-default">
              <XMarkIcon />
            </div>
            <Image
              src={base64}
              className="rounded-xl w-full"
              height={1000}
              width={1000}
              alt="uploaded"
            />
          </div>
        ) : null}
        <div className="w-full flex items-center justify-between">
          <div
            {...getRootProps({
              className:
                "hover:bg-blue-900 hover:bg-opacity-30 rounded-full p-2 cursor-pointer w-fit",
            })}
          >
            <input {...getInputProps()} />
            <PhotoIcon className="text-blue-500 h-6 w-6" />{" "}
          </div>
          <button>Submit</button>
        </div>
      </div>
    </div> */
