
import SkeletonTweet from "@/components/SkeletonTweet";
import Tweet from "@/components/Tweet";
import { useGetAllTweetsQuery } from "@/redux/services/tweetsApi";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const { isLoading, data } = useGetAllTweetsQuery(undefined, {
    refetchOnReconnect: true,
  });

  if (status === "authenticated") {
    router.push("/home");
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Explorar / Twitter</title>
      </Head>
      <Header />
      {
        status !== "authenticated" && (
          !isLoading && data !== undefined
            ? data
              .filter((tweet) => tweet.author && !tweet.isRetweet)
              .map((tweet) => <Tweet key={tweet._id} {...tweet} />)
            : [1, 2, 3, 4, 5, 6, 7].map((tweet) => <SkeletonTweet key={tweet} />)
        )
      }
    </>
  );
}

const Header = () => {
  return (
    <div className="sticky top-0 z-10  bg-white/75 backdrop-blur-md dark:bg-black/70 dark:text-[#e7e9ea]">
      <div className="flex items-center justify-between px-4 py-5">
          <div>
            <h2 className="text-xl font-bold">Explorar</h2>
          </div>
      </div>
    </div>
  );
};
