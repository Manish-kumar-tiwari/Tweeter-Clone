import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Tweet from "./Tweet";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import { message } from "antd";
import { setRefresh } from "./redux/tweetSlice";
import { MdEmojiEmotions } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import useGetSingleTweets from "./hooks/useGetSingleTweets";
import { MdOutlineGifBox } from "react-icons/md";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../firebase";
import { CiImageOn } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";

const CommentList = () => {
  const [emoji, setEmoji] = useState(false);
  const [loding, setLoding] = useState(false);
  const [imguri, setImguri] = useState();
  const { user } = useSelector((store) => store.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const params = useParams();
  const id = params.id;
  const nevigate = useNavigate();

  useGetSingleTweets(id);

  const { singleTweets } = useSelector((store) => store.tweet);

  if (singleTweets.length === 0) {
    return;
  }

  const uplodeImageHandler = () => {
    const input = document.getElementById("post-img");
    input.click();
  };

  const imgHandler = async (e) => {
    try {
      setLoding(true);
      const image = e.target.files[0];
      if (image) {
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/" + image.name);
        await uploadBytes(storageRef, image);
        const uri = await getDownloadURL(storageRef);
        setLoding(false);
        setImguri(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postHandler = async () => {
    try {
      const res = await axios.post(
        `/api/v1/tweet/postComment/${singleTweets._id}`,
        {
          token,
          post,
          imguri,
        }
      );
      setPost("");
      setImguri("");
      setEmoji(false);
      message.success(res.data.msg);
      dispatch(setRefresh());
    } catch (error) {
      console.log(error);
    }
  };

  const backHandler = async () => {
    nevigate("/");
  };

  return (
    <div className="w-[50%] border   max-[800px]:ml-0 max-[800px]:w-[100%] max-[800px]:mb-16 border-gray-900">
      {singleTweets && (
        <div>
          <div className="flex items-center">
            <IoIosArrowRoundBack
              onClick={backHandler}
              color="white"
              size={"50px"}
              className="p-2 hover:bg-gray-500 rounded-full font-bold"
            />
            <h1 className="text-white font-bold text-3xl ml-5">Post</h1>
          </div>

          {singleTweets && (
            <div className="mt-5">
              <Tweet tweet={singleTweets} />
            </div>
          )}

          <div className="border-b border-gray-500 ">
            <div className="p-4 mt-5 flex items-center  py-7">
              <div className="mt-4 ml-3">
                <h1 className="text-gray-400 text-xl">
                  Replying to
                  <span className="text-blue-600">
                    {` @${singleTweets?.userDetails[0]?.username}`}
                  </span>
                </h1>
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
                  className="outline-none border-none ml-3 bg-black  text-3xl text-white w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-14 mt-12 mb-3">
              {!loding && (
                <div
                  className="cursor-pointer hover:bg-gray-500 rounded-full"
                  onClick={uplodeImageHandler}
                >
                  <CiImageOn
                    color="white"
                    size={"60px"}
                    className="cursor-pointer p-3 hover:bg-gray-500 rounded-full"
                  />
                </div>
              )}

              {loding && (
                <div className="cursor-pointer">
                  <FaSpinner color="white" size={"35px"} className="text-xl " />
                </div>
              )}

              <input
                type="file"
                id="post-img"
                onChange={(e) => imgHandler(e)}
                style={{ display: "none" }}
              />

              <div className="relative">
                <MdEmojiEmotions
                  className="cursor-pointer p-3 hover:bg-gray-500 rounded-full"
                  color="yellow"
                  size={"60px"}
                  onClick={() => setEmoji(!emoji)}
                />

                {emoji && (
                  <div className="absolute emoji">
                    <EmojiPicker
                      height={450}
                      width={260}
                      theme="dark"
                      onEmojiClick={(e) => {
                        setPost(post + e.emoji);
                      }}
                    />
                  </div>
                )}
              </div>

              <MdOutlineGifBox
                className="cursor-pointer p-3 hover:bg-gray-500 rounded-full"
                color="blue"
                size={"60px"}
              />
              {(post || imguri) && (
                <button
                  onClick={postHandler}
                  className="bg-[#1D9BF0] px-5 py-2 text-white text-lg font-bold rounded-full"
                >
                  Reply
                </button>
              )}

              {!post && !imguri && (
                <button className="bg-[#a1d3f4] px-5 py-2 text-white text-lg font-bold rounded-full">
                  Reply
                </button>
              )}
            </div>
          </div>

          <div>
            {singleTweets?.comments.length !== 0 &&
              singleTweets?.comments?.map((comment, idx) => {
                return (
                  <div key={idx} className="p-4 border-b border-gray-700 py-8">
                    <div className="flex items-start">
                      <div>
                        <Avatar src={comment.avatar} size="44px" round={true} />
                      </div>

                      <div className="ml-5">
                        <div className="flex items-center">
                          <h1 className="text-white   text-2xl max-[800px]:text-xl ">
                            {comment.name}
                          </h1>
                          <h1 className="text-gray-400 text-xl ml-2 max-[800px]:text-sm max-[800px]:ml-2">
                            @{comment.username} .1m
                          </h1>
                        </div>

                        {comment.extraDetails.post && (
                          <div className="mt-4">
                            <h1 className="text-white  text-2xl">
                              {comment.extraDetails.post}
                            </h1>
                          </div>
                        )}

                        {comment.extraDetails.photo && (
                          <div className="mt-8 h-96 w-fit flex justify-around">
                            <img
                              className="h-96 w-fit"
                              src={comment.extraDetails.photo}
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            {singleTweets.comments.length === 0 && (
              <h1 className="text-white font-bold text-6xl p-4 ml-[10%]">
                No Comment yet!
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;
