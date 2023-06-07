import Image from "next/image";
import React, { useState } from "react";

export default function UserHover({ user, onClickFollowUser, data }) {
  const { image, name, _id } = user;
  console.log(user);
  // Mover la llamada al hook al cuerpo principal del componente
  return (
    <div
      className="fixed right-52 top-64 flex h-[300px] w-[300px] flex-col rounded-lg bg-white dark:bg-black"
      key={_id}
    >
      <div className="flex justify-around">
        {" "}
        <Image
          src={image}
          width={50}
          height={100}
          alt="Avatar"
          className="rounded-full"
          unoptimized
        />{" "}
        <button
          onClick={() => onClickFollowUser(_id)}
          className="ml-2 h-9 w-[80px] rounded-full bg-white text-sm font-bold dark:text-black"
        >
          Seguir
        </button>
      </div>
      <div>
        {" "}
        <div className=" ml-3 inline-block">
          <h3 className=" font-bold hover:underline dark:text-white">{name}</h3>
          <p className=" text-xs dark:text-gray-400">
            {/*        @{user.email.split("@")[0]} */}Svrk73
          </p>{" "}
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm dark:text-white">
          {data?.bio} Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
        </p>
      </div>
      <div className="ml-3 dark:text-white">
        {data && data?.following} Siguiendo {data && data?.followers} Seguidores
      </div>
    </div>
  );
}
