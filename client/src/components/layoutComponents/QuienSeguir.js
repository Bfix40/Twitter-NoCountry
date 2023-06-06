import {
  useFollowUserMutation,
  useGetAllUsersQuery,
  useGetMyProfileQuery,
  useUnFollowUserMutation,
} from "@/redux/services/usersApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

function QuienSeguir() {
  const { data: session } = useSession();
  const loggedInUserId = session?.user?._id;
  const userActual = useGetMyProfileQuery(session?.token);
  const [randomData, setRandomData] = useState([]);
  const { data, isLoading } = useGetAllUsersQuery();
  const [following, setFollowing] = useState([]);
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = (id) => {
    setHovered((prevHovered) => ({
      ...prevHovered,
      [id]: true,
    }));
  };
  const handleMouseLeave = (id) => {
    setHovered((prevHovered) => ({
      ...prevHovered,
      [id]: false,
    }));
  };
  useEffect(() => {
    if (data) {
      const filteredData = data.filter((user) => user._id !== loggedInUserId);
      const randomUsers = [...filteredData]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setRandomData(randomUsers);
    }
  }, [data, loggedInUserId]);

  useEffect(() => {
    if (userActual.data?.following) {
      const followingIds = userActual.data.following.map((user) => user._id);
      setFollowing(followingIds);
    }
  }, [userActual.data?.following]);

  const [unfollowUser] = useUnFollowUserMutation();
  const [followUser] = useFollowUserMutation();

  const onClickFollowUser = async (id) => {
    const res = await followUser({ userId: id, token: session.token });
    if (res.data) {
      setFollowing((prevFollowing) => [...prevFollowing, id]);
    }
  };

  const onClickUnFollowUser = async (id) => {
    const res = await unfollowUser({ userId: id, token: session.token });
    if (res.data) {
      setFollowing((prevFollowing) =>
        prevFollowing.filter((userId) => userId !== id)
      );
    }
  };
  if (userActual.isFetching) {
    return (
      <div>
        <div className="flex h-[330px] max-w-[330px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 ">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="h-[330px] max-w-[330px] rounded-xl dark:bg-[#16181C]">
        <h2 className="ml-3 mt-2 text-[23px] font-semibold dark:text-white">
          A quién seguir
        </h2>
        {isLoading ? (
          <div>
            <div className="flex h-[330px] max-w-[330px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          randomData.map((user) => (
            <div
              className="my-1.5 flex flex-row items-center gap-2 p-3 hover:bg-gray-800"
              key={user._id}
            >
              <Image
                src={user.image}
                width={50}
                height={100}
                alt="Avatar"
                className="rounded-full"
                unoptimized
              />{" "}
              <div className="ml-1 inline-block w-[90px] grow">
                <Link href={"/" + user.username}>
                  <h3 className="truncate font-bold dark:text-white hover:underline">
                    {user.name}
                  </h3>
                  <p className="truncate text-xs dark:text-gray-400">
                    @{user.email.split("@")[0]}
                  </p>{" "}
                </Link>
              </div>
              {following.includes(user._id) ? (
                <button
                  onMouseEnter={() => handleMouseEnter(user._id)}
                  onMouseLeave={() => handleMouseLeave(user._id)}
                  onClick={() => onClickUnFollowUser(user._id)}
                  className="ml-2 h-9 min-w-[130px] rounded-full border font-bold text-white hover:border-red-600 hover:bg-red-600/30 dark:hover:border-red-600 dark:hover:bg-red-600/30 hover:text-red-600 dark:hover:text-red-600 text-sm"
                >
                  {following.includes(user._id) && hovered[user._id] ? "Dejar de seguir" : "Siguiendo"}
                </button>
              ) : (
                <button
                  onClick={() => onClickFollowUser(user._id)}
                  className="ml-2 h-9 w-[80px] rounded-full bg-white text-sm font-bold dark:text-black"
                >
                  Seguir
                </button>
              )}
            </div>
          ))
        )}
        <Link href="/explore" className="text-md ml-3 text-blue-500">
          Mostrar más
        </Link>
      </div >
    </>
  );
}

export default QuienSeguir;
