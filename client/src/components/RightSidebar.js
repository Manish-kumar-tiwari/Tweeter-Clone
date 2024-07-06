import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const RightSidebar = () => {
  const { otherUsers } = useSelector((store) => store.user);
  const [search, setSearch] = useState("");
  if (!otherUsers) {
    return;
  }
  return (
    <div
      className="w-[25%] absolute items-center p-2 right-4  "
      style={{ position: "fixed" }}
    >
      <div className="w-full bg-gray-700 rounded-full p-3 flex items-center">
        <CiSearch size={"24px"} />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search"
          className="outline-none text-2xl bg-gray-700 ml-2 text-white"
        />
      </div>

      <div className="border border-gray-900 rounded-xl mt-5 p-2 bg-black overflow-auto">
        <div className="p-4">
          <h1 className="font-bold text-xl text-white">Who to follow</h1>
        </div>

        {otherUsers
          ?.filter((user) =>
            user.name.toUpperCase().includes(search.trim().toUpperCase())
          )
          .map((user, idx) => {
            return (
              idx < 3 && (
                <div
                  key={idx}
                  className="flex  p-1 items-center justify-between my-2  w-full"
                >
                  <div className="flex">
                    <Avatar src={user?.avatar} size="44px" round={true} />
                    <div className="ml-3">
                      <h1 className="font-bold text-lg text-white">
                        {user.name}
                      </h1>
                      <p className="text-sm text-gray-300">{`@${user.username}`}</p>
                    </div>
                  </div>

                  <div className="ml-[10%]">
                    <Link className="ml-[10%]" to={`/profile/${user?._id}`}>
                      <button className="bg-white text-lg hover:bg-slate-300 font-semibold rounded-full text-black px-5 py-2">
                        Profile
                      </button>
                    </Link>
                  </div>
                </div>
              )
            );
          })}

        <NavLink className="text-blue-600 ml-3 text-2xl" to={"/connect"}>
          {" "}
          Show More
        </NavLink>
      </div>
    </div>
  );
};

export default RightSidebar;
