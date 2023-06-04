import Post from "@/components/Post";
import Tweet from "@/components/Tweet";
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useGetAllTweetsQuery } from "@/redux/services/tweetsApi";
import SkeletonTweet from "@/components/SkeletonTweet";

function Home() {
  const { isLoading, data } = useGetAllTweetsQuery(undefined, {
    refetchOnReconnect: true,
  });
  const [isSelected, setIsSelected] = useState("para-ti");

  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Inicio / Twitter</title>
      </Head>

      <Header isSelected={isSelected} setIsSelected={setIsSelected} />
      <Post />
      {!isLoading && data !== undefined
        ? data
          .filter((tweet) => tweet.author)
          .map((tweet) => <Tweet key={tweet._id} {...tweet} />)
        : [1, 2, 3, 4, 5, 6, 7].map((tweet) => <SkeletonTweet key={tweet} />)}
    </>
  );
}

export default Home;

const Header = ({ isSelected, setIsSelected }) => {
  return (
    <div className="sticky top-0 z-10 border-b border-black/5 bg-white/75 backdrop-blur-md dark:border-white/20 dark:bg-black dark:text-[#e7e9ea]">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/home">
          <div>
            <h2 className="text-xl font-bold">Inicio</h2>
          </div>
        </Link>
      </div>
      <div className="flex text-[#536471]">
        <div
          onClick={() => setIsSelected("para-ti")}
          className={`text-md flex h-[60px] w-full items-center justify-center p-4 ${
            isSelected === "para-ti"
              ? "font-bold text-black dark:text-[#e7e9ea]"
              : "font-semibold text-gray-500 dark:text-[#536471]"
          }  cursor-pointer transition duration-200 ease-in-out hover:bg-gray-500 hover:bg-opacity-10`}
        >
          <div
            className={`inline-block border-b-4 text-center ${
              isSelected === "para-ti"
                ? "border-b-[#1C9CEF]"
                : "border-b-transparent"
            } h-[60px] `}
          >
            <div className="my-auto mt-4">Para ti </div>
          </div>
        </div>
        <div
          onClick={() => setIsSelected("siguiendo")}
          className={`text-md flex h-[60px] w-full items-center justify-center  p-4 ${
            isSelected === "siguiendo"
              ? "font-bold text-black dark:text-[#e7e9ea]"
              : "font-semibold text-gray-500 dark:text-[#536471]"
          }  cursor-pointer transition duration-200 ease-in-out hover:bg-gray-500 hover:bg-opacity-10`}
        >
          <div
            className={`inline-block border-b-4 text-center ${
              isSelected === "siguiendo"
                ? "border-b-[#1C9CEF]"
                : "border-b-transparent"
            } h-[60px] `}
          >
            <div className="my-auto mt-4">Siguiendo </div>
          </div>
        </div>
      </div>
    </div>
  );
};
