import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setFollowerUser, setFollowingUser } from "./redux/userSlice";
import axios from "axios";

const FollowedFollowing = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    const followingUser = async () => {
      try {
        const res = await axios.post("/api/v1/user/getFollowings", { id });

        dispatch(setFollowingUser(res.data.followingUser));
      } catch (error) {
        console.log(error);
      }
    };

    const followerUser = async () => {
      try {
        const res = await axios.post("/api/v1/user/getFollowers", { id });

        dispatch(setFollowerUser(res.data.follower));
      } catch (error) {
        console.log(error);
      }
    };

    followingUser();
    followerUser();
  }, [id]);

  const [following, setFollowing] = useState(true);
  const { followerUser, followingUser } = useSelector((store) => store.user);

  return (
    <div className="w-[50%] border border-gray-900">
      <div className="flex justify-around border border-gray-600  ">
        <div
          onClick={() => setFollowing(true)}
          className={`hover:bg-gray-900 p-4 w-full flex justify-around cursor-pointer ${
            following && "border-b-4 border-blue-700"
          }`}
        >
          <h1 className="text-white text-2xl font-bold">Followings</h1>
        </div>
        <div
          onClick={() => setFollowing(false)}
          className={`hover:bg-gray-900 p-4 w-full flex justify-around cursor-pointer ${
            !following && "border-b-4 border-blue-700"
          }`}
        >
          <h1 className="text-white text-2xl font-bold">Followers</h1>
        </div>
      </div>

      <div>
        {following &&
          followingUser?.map((user, idx) => {
            return (
              <div
                key={idx}
                className="flex  p-1 items-center justify-between my-2 w-full"
              >
                <div className="flex">
                  <Avatar
                    className="ml-4"
                    src={user.avatar}
                    size="50px"
                    round={true}
                  />
                  <div className="ml-7">
                    <h1 className="font-bold text-2xl text-white">
                      {user.name}
                    </h1>
                    <p className="text-sm text-gray-300">{`@${user.username}`}</p>
                  </div>
                </div>

                <div className="mr-8">
                  <Link className="ml-[5%]" to={`/profile/${user?._id}`}>
                    <button className="bg-white text-lg font-semibold rounded-full text-black px-5 py-2">
                      Profile
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}

        {following && followingUser.length === 0 && (
          <div>
            <h1 className="text-6xl font-bold text-white px-[24%] p-4">
              Be in the know
            </h1>
            <p className="text-lg text-gray-400 font-bold px-[24%]">
              Following accounts is an easy way to curate your timeline and know
              what’s happening with the topics and people you’re interested in.
            </p>
          </div>
        )}
        {!following &&
          followerUser?.map((user, idx) => {
            return (
              <div
                key={idx}
                className="flex  p-1 items-center justify-between my-2 w-full"
              >
                <div className="flex">
                  <Avatar
                    className="ml-4"
                    src={user.avatar}
                    round={true}
                    size="50px"
                  />
                  <div className="ml-7">
                    <h1 className="font-bold text-2xl text-white">
                      {user.name}
                    </h1>
                    <p className="text-sm text-gray-300">{`@${user.username}`}</p>
                  </div>
                </div>

                <div className="mr-8">
                  <Link className="ml-[5%]" to={`/profile/${user?._id}`}>
                    <button className="bg-white text-lg font-semibold rounded-full text-black px-5 py-2">
                      Profile
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}

        {!following && followerUser.length === 0 && (
          <div>
            <h1 className="text-6xl font-bold text-white px-[24%] p-4">
              Looking for followers?
            </h1>
            <p className="text-lg text-gray-400 font-bold px-[24%]">
              When someone follows this account, they’ll show up here. Posting
              and interacting with others helps boost followers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowedFollowing;
