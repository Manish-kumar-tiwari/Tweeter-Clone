import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "./redux/tweetSlice";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FaSpinner } from "react-icons/fa6";
import app from "../firebase";
import { setPost } from "./redux/userSlice";
import { MdEmojiEmotions, MdOutlineGifBox } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

const CreatePost = () => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [imguri, setImguri] = useState();
  const token = localStorage.getItem("token");
  const [loding, setLoding] = useState(false);
  const { user, post } = useSelector((store) => store.user);
  const [emoji, setEmoji] = useState(false);

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
      const res = await axios.post("/api/v1/tweet/create", {
        token,
        description,
        imguri,
      });
      if (res.data.success) {
        message.success(res.data.msg);
        setDescription("");
        dispatch(setRefresh());
        dispatch(setPost(false));
        setEmoji(false);
        setImguri();
      } else {
        message.error(res.data.msg);
        setImguri();
      }
    } catch (error) {
      message.error(error.response.data.msg);
      setImguri();
    }
  };

  return (
    <div className="w-[100%] ">
      <div className="border-b border-gray-900">
        <div className="flex p-4 my-4 items-center">
          <div>
            <Avatar src={user?.avatar} size="44px" round={true} />
          </div>
          <div className="w-full ">
            <input
              value={description}
              className={`text-3xl border-none outline-none bg-black
              text-white  px-4 w-full`}
              type="text"
              placeholder="What is Happenning?!"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div
          className={`justify-between flex my-4 px-4 items-center max-[800px]:mt-16 ${
            post ? "mt-24" : "mt-16"
          }`}
        >
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
                  width={300}
                  theme="dark"
                  onEmojiClick={(e) => {
                    setDescription(description + e.emoji);
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

          <input
            type="file"
            id="post-img"
            onChange={(e) => imgHandler(e)}
            style={{ display: "none" }}
            className=""
          />

          <div>
            {(description || imguri) && (
              <button
                onClick={postHandler}
                className={`px-5 py-2  bg-[#1D9BF0] text-lg text-white font-semibold rounded-full `}
              >
                Post
              </button>
            )}

            {!description && !imguri && (
              <button
                className={`px-5 py-2  bg-[#687e8d] text-lg text-white font-semibold rounded-full `}
              >
                Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
