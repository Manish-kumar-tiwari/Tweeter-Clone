import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import Tweet from "./Tweet";

const Explore = () => {
  document.title = "Explore / X"
  const { totalTweets } = useSelector((store) => store.tweet);
  const [search, setSearch] = useState("");
  return (
    <div className="w-[50%] border border-gray-900">
      <div className="flex w-full bg-gray-500 p-3 rounded-full mt-2">
        <CiSearch color="white" size={"34px"} />
        <input
          
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="relative  w-full ml-4 bg-gray-500 border-none outline-none text-white font-semibold text-3xl"
        />
      </div>

      <div className="flex justify-around border-b-4 border-gray-600">
        <h1 className="text-6xl font-bold p-4 text-white">Post</h1>
      </div>

      <div className=" ">
        {totalTweets
          ?.filter((tweet) =>
            tweet.userDetails[0].username
              .toUpperCase()
              .includes(search.trim().toUpperCase())
          )
          .map((tweet,idx) => {
            return <Tweet tweet={tweet} key={idx}/>;
          })}

        {totalTweets?.filter((tweet) =>
          tweet.userDetails[0].username
            .toUpperCase()
            .includes(search.trim().toUpperCase())
        ).length === 0 && <h1 className="text-white font-bold text-6xl">There is No post</h1>}
      </div>
    </div>
  );
};

export default Explore;
