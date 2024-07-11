import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing } from "./redux/tweetSlice";
import Avatar from "react-avatar";

const Feed = () => {
  const { allTweets, followingTweets, following } = useSelector(
    (store) => store.tweet
  );

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  return (
    <div className="ml-14 max-[800px]:ml-0 max-[800px]:w-[100%] w-[50%]  border-l border-t border-r border-gray-900 h-auto  ">
      <div className="min-[800px]:hidden">
        <div className="flex items-center gap-24">
          <div className="p-3 ">
            <Avatar src={user?.avatar} size="54px" round={true} />
          </div>
          <img
            width={"50px"}
            src="https://freelogopng.com/images/all_img/1690643591twitter-x-logo-png.png"
            alt="twitter-logo"
          />
        </div>
      </div>
      <div className="flex justify-evenly  border-b border-gray-900  ">
        <div
          onClick={() => {
            dispatch(setFollowing(false));
          }}
          className={`p-4 cursor-pointer hover:bg-gray-900 w-full text-center ${
            !following && "border-b-4 border-blue-600"
          }`}
        >
          <h1 className="text-xl font-semibold text-white ">For You</h1>
        </div>

        <div
          onClick={() => {
            dispatch(setFollowing(true));
          }}
          className={`p-4 cursor-pointer hover:bg-gray-900 w-full text-center ${
            following && "border-b-4 border-blue-600 "
          }`}
        >
          <h1 className="text-xl font-semibold text-white ">Following</h1>
        </div>
      </div>

      <div className="  py-10 ">
        <CreatePost />

        {!following &&
          allTweets?.map((tweet) => {
            return <Tweet key={tweet?._id} tweet={tweet} />;
          })}

        {following &&
          followingTweets?.map((tweet) => {
            return <Tweet key={tweet?._id} tweet={tweet} />;
          })}
      </div>
    </div>
  );
};

export default Feed;
