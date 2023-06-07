import {
  useFollowUserMutation,
  useGetAllUsersQuery,
  useGetMyProfileQuery,
  useUnFollowUserMutation,
} from "@/redux/services/usersApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
/* import UserHover from "./UserHover"; */
import Loading from "../Loading";
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
  /*   const [hoveredUserId, setHoveredUserId] = useState(null);
  const [dataToRender, setDataToRender] = useState(null);
  const handleUserMouseEnter = (id) => {
    setDataToRender(data);
    setHoveredUserId(id);
  };
  const handleUserMouseLeave = () => {
    setHoveredUserId(null);
  }; */
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
          <Loading />
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
              <Loading />
            </div>
          </div>
        ) : (
          randomData.map((user) => (
            <div
              className="my-1.5 flex flex-row items-center gap-2 p-3 hover:bg-gray-200 dark:hover:bg-gray-800"
              key={user._id}
              /*    onMouseEnter={() => handleUserMouseEnter(user._id)}
              onMouseLeave={handleUserMouseLeave} */
            >
              <Image
                src={user.image}
                width={50}
                height={100}
                alt="Avatar"
                className="rounded-full"
                unoptimized
              />{" "}
              {/*    {hoveredUserId === user._id && (
                <UserHover
                  user={user}
                  onClickFollowUser={onClickFollowUser}
                  data={dataToRender}
                />
              )} */}
              <div className="ml-1 inline-block w-[90px] grow">
                <Link href={"/" + user.username}>
                  <h3 className="truncate font-bold hover:underline dark:text-white">
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
                  className="ml-2 h-9 min-w-[130px] rounded-full border text-sm  font-bold text-black hover:border-red-600 hover:bg-red-600/30 hover:text-red-600 dark:text-white dark:hover:border-red-600 dark:hover:bg-red-600/30 dark:hover:text-red-600"
                >
                  {following.includes(user._id) && hovered[user._id]
                    ? "Dejar de seguir"
                    : "Siguiendo"}
                </button>
              ) : (
                <button
                  onClick={() => onClickFollowUser(user._id)}
                  className="ml-2 h-9 w-[80px] rounded-full bg-gray-800 text-sm font-bold text-white dark:bg-white dark:text-black"
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
      </div>
    </>
  );
}

export default QuienSeguir;
