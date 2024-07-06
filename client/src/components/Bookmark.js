import React from "react";
import { useSelector } from "react-redux";
import Tweet from "./Tweet";

const Bookmark = () => {
  document.title = "Bookmarks / X"
  const { bookmarkTweets } = useSelector((store) => store.user);
  if (!bookmarkTweets) {
    return;
  }
  return (
    <div className="w-[50%] border border-gray-900">
      <div className="border-b border-gray-800 p-5">
        <h1 className="font-bold text-3xl text-white">Bookmarks</h1>
        <p className="text-gray-400  text-2xl">@manish</p>
      </div>

      <div className="p-4  w-full ">
        {bookmarkTweets.length !== 0 &&
          bookmarkTweets?.map((tweetArray, idx) => {
            return <Tweet tweet={tweetArray[0]} key={idx} />;
          })}

        {bookmarkTweets.length === 0 && (
          <div className="flex justify-around">
            <div>
              <h1 className="text-white text-6xl font-bold">
                Save posts for later
              </h1>
              <h1 className="text-gray-600 text-2xl p-4">
                Bookmark posts to easily find them again in the future.
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
