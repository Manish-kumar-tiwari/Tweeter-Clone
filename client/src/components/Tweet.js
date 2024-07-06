import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setComment, setRefresh } from "./redux/tweetSlice";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdBookmark } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
// import CommentBox from "./CommentBox";

const Tweet = ({ tweet }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [isBookmark, setBookmark] = useState(false);
  const token = localStorage.getItem("token");
  const { refresh } = useSelector((store) => store.tweet);
  // const { comment } = useSelector((store) => store.tweet);

  const likeHandler = async () => {
    const res = await axios.put(`/api/v1/tweet/like/${tweet._id}`, { token });
    dispatch(setRefresh());
    message.success(res.data.msg);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  // const commentHandler = () => {
  //   dispatch(setComment(true));
  // };

  const deleteHandler = async () => {
    try {
      const res = await axios.post(`/api/v1/tweet/delete/${tweet._id}`, {
        token,
      });
      message.success(res.data.msg);
      dispatch(setRefresh());
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.put(`/api/v1/user/bookmark/${tweet._id}`, {
        token,
      });

      message.success(res.data.msg);
      dispatch(setRefresh());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!tweet) {
      return;
    }
    if (user?.bookmark?.includes(tweet?._id)) {
      setBookmark(true);
    } else {
      setBookmark(false);
    }
  }, [refresh]);

  return (
    <div className="border-b border-gray-900  ">
      <div className="flex m-4   mb-4 ">
        <Link className="h-12" to={`/profile/${tweet?.userDetails[0]?._id}` }>
          <Avatar
            src={tweet?.userDetails[0]?.avatar}
            size="44px"
            round={true}
          />
        </Link>
        <div className=" ml-2 w-full">
          <div className="flex items-center">
            <Link
              to={`/profile/${tweet?.userDetails[0]?._id}`}
              className="font-bold text-2xl text-white"
            >
              {tweet?.userDetails[0]?.name}
            </Link>
            <p className="text-xl text-gray-500 ml-1">{`@${tweet?.userDetails[0]?.username} .1m`}</p>
          </div>

          <Link to={`/comment/${tweet?._id}`}>
            <p className="text-2xl text-white">{tweet?.description}</p>
            {tweet?.image && (
              <div className="w-full py-3 h-[600px]">
                <img
                  src={tweet?.image}
                  alt="post"
                  className="rounded-md w-full h-[600px]"
                />
              </div>
            )}
          </Link>

          <div className="flex justify-between w-full mt-4 mb-6">
            <div className="flex items-center">
              {/* <div
                onClick={commentHandler}
                className="p-2 hover:bg-green-200 rounded-full cursor-pointer"
              >
                <FaRegComment color="white" size={"24px"} />
              </div>
              <p className="text-white">{tweet?.comments?.length}</p>
              {comment && <CommentBox tweet={tweet} />} */}

              <Link
                to={`/comment/${tweet?._id}`}
                className="p-2 hover:bg-green-200 rounded-full cursor-pointer"
              >
                <FaRegComment color="white" size={"24px"} />
              </Link>
              <p className="text-white">{tweet?.comments?.length}</p>
             
            </div>
            <div className="flex items-center">
              <div
                onClick={likeHandler}
                className="p-2 hover:bg-red-200 rounded-full cursor-pointer"
              >
                {tweet?.like?.includes(user?._id) ? (
                  <FaHeart color="red" size={"30px"} />
                ) : (
                  <CiHeart color="white" size={"30px"} />
                )}
              </div>
              <p className="text-white">{tweet?.like?.length}</p>
            </div>
            <div className="flex items-center">
              <div
                onClick={bookmarkHandler}
                className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer"
              >
                {user?.bookmark?.includes(tweet?._id) ? (
                  <IoMdBookmark color="blue" size={"30px"} />
                ) : (
                  <CiBookmark color="white" size={"30px"} />
                )}
              </div>
            </div>
            {tweet?.userDetails[0]?._id === user._id && (
              <div className="flex items-center">
                <div
                  onClick={deleteHandler}
                  className="p-2 hover:bg-red-400 rounded-full cursor-pointer"
                >
                  <MdDeleteOutline color="white" size={"30px"} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
