import  React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { setComment, setRefresh } from "./redux/tweetSlice";
import { RxCross1 } from "react-icons/rx";
import Avatar from "react-avatar";
import { FaRegImage } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";
import axios from "axios";
import { message } from "antd";

export default function CommentBox({ tweet }) {
  const [post, setPost] = useState("");
  const { comment } = useSelector((store) => store.tweet);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleClose = () => {
    dispatch(setComment(false));
  };

  const postHandler = async () => {
    
    try {
      const res = await axios.post(`/api/v1/tweet/postComment/${tweet._id}`, {
        token,
        post,
      });
      setPost("");
      message.success(res.data.msg);
      dispatch(setRefresh());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        className="rounded-full"
        fullWidth
        maxWidth="md"
        open={comment}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="bg-gray-700">
          <div onClick={handleClose}>
            <RxCross1
              color="white"
              size={"48px"}
              className="p-3 w- rounded-full hover:bg-gray-900 cursor-pointer"
            />
          </div>

          <div className="flex p-4 items-start">
            <div>
              <Avatar
                src={tweet?.userDetails[0]?.avatar}
                size="50px"
                round={true}
              />
            </div>

            <div>
              <div className="flex items-center">
                <h1 className="font-bold text-3xl text-white ml-3">
                  {tweet?.userDetails[0]?.name}
                </h1>
                <p className="text-xl text-gray-500 ml-1">{`@${tweet?.userDetails[0]?.username} .1m`}</p>
              </div>
              <div className="ml-3 mt-3">
                <p className="text-white  text-2xl  ">{tweet?.description}</p>
              </div>

              <div className="mt-4 ml-3">
                <h1 className="text-gray-900 text-xl">
                  Replying to
                  <span className="text-blue-600">
                    {` @${tweet?.userDetails[0]?.username}`}
                  </span>{" "}
                </h1>
              </div>
            </div>
          </div>

          <div className="p-4 mt-5 flex items-center">
            <Avatar src={user?.avatar} size="50px" round={true} />

            <div className="w-full">
              <input
                onChange={(e) => setPost(e.target.value)}
                type="text"
                value={post}
                placeholder="Post Your Reply"
                className="outline-none border-none ml-3 bg-gray-700  text-3xl text-white w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between px-4 mt-14 mb-3">
            <FaRegImage
              className="cursor-pointer p-3 hover:bg-gray-500 rounded-full"
              color="white"
              size={"60px"}
            />
            {/* <EmojiPicker/> */}
            <MdEmojiEmotions
              className="cursor-pointer p-3 hover:bg-gray-500 rounded-full"
              color="white"
              size={"60px"}
            />
            {post && (
              <button
                onClick={postHandler}
                className="bg-[#1D9BF0] px-5 py-2 text-white text-lg font-bold rounded-full"
              >
                Reply
              </button>
            )}

            {!post && (
              <button className="bg-[#a1d3f4] px-5 py-2 text-white text-lg font-bold rounded-full">
                Reply
              </button>
            )}
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
