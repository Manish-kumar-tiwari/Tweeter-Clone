import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "./redux/userSlice";
import { ImCross } from "react-icons/im";
import Avatar from "react-avatar";
import { TbCameraPlus } from "react-icons/tb";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ImSpinner2 } from "react-icons/im";
import app from "../firebase";
import axios from "axios";
import { setRefresh } from "./redux/tweetSlice";
import { message } from "antd";
import React, { useState } from "react";

export default function EditProfile() {
  const dispatch = useDispatch();
  const { open } = useSelector((store) => store.user);
  const { profile } = useSelector((store) => store.user);
  const token = localStorage.getItem("token");

  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [username, setUsername] = useState(profile.username);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [banner, setBanner] = useState(profile.banner);
  const [loading, setLoading] = useState(false);

  const saveHandler = async () => {
    try {
      const res = await axios.post("/api/v1/user/updateProfile", {
        token,
        name,
        username,
        bio,
        avatar,
        banner,
      });

      dispatch(setRefresh());
      dispatch(setOpen(false));

      message.success(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const profilePicHandler = () => {
    setLoading(true);
    const input = document.getElementById("profile-pic");
    input.click();
  };

  const bannerPicHandler = () => {
    setLoading(true);
    const input = document.getElementById("banner-pic");
    input.click();
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const bannerHandler = async (e) => {
    try {
      const image = e.target.files[0];
      if (image) {
        console.log(image);
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/" + image.name);
        await uploadBytes(storageRef, image);
        const uri = await getDownloadURL(storageRef);
        setLoading(false);
        setBanner(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const avatarHandler = async (e) => {
    try {
      const image = e.target.files[0];
      if (image) {
        console.log(image);
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/" + image.name);
        await uploadBytes(storageRef, image);
        const uri = await getDownloadURL(storageRef);
        setLoading(false);
        setAvatar(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="md"
        className=" bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border border-gray-400 p-3 px-5 "
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="flex justify-between bg-black p-2 ">
          <div className="flex items-center">
            <div
              onClick={handleClose}
              className="p-3 cursor-pointer rounded-full hover:bg-gray-800"
            >
              <ImCross color="white" />
            </div>
            <div className="p-2">
              <h1 className="text-2xl text-white font-bold">Edit Profile</h1>
            </div>
          </div>
          <div className="p-2">
            <button
              onClick={saveHandler}
              className=" px-5 py-2 bg-white text-black font-bold text-lg rounded-full"
            >
              Save
            </button>
          </div>
        </div>
        <div className="bg-black">
          <div className="h-72 w-full">
            <img className="h-72 w-full" src={banner} alt="banner" />
          </div>

          {!loading && (
            <div
              onClick={bannerPicHandler}
              className="absolute -mt-[20%] ml-[50%] cursor-pointer bg-gray-900 rounded-full p-3 hover:bg-gray-500 "
            >
              <TbCameraPlus color="white" size={"30px"} />
            </div>
          )}

          {loading && (
            <div className="absolute -mt-[20%] ml-[50%] cursor-pointer bg-gray-900 rounded-full p-3 hover:bg-gray-500 ">
              <ImSpinner2 color="white" size={"30px"} />
            </div>
          )}

          <input
            type="file"
            style={{ display: "none" }}
            id="banner-pic"
            onChange={(e) => {
              bannerHandler(e);
            }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            id="profile-pic"
            onChange={(e) => {
              avatarHandler(e);
            }}
          />
          <div className="absolute top-72 ml-2  rounded-full bg-black">
            <Avatar src={avatar} size="140" round={true} />

            {!loading && (
              <div
                onClick={profilePicHandler}
                className="absolute -mt-20 ml-12 cursor-pointer bg-gray-500 rounded-full p-3 hover:bg-gray-300 "
              >
                <TbCameraPlus color="white" size={"20px"} />
              </div>
            )}

            {loading && (
              <div className="absolute -mt-20 ml-12 cursor-pointer bg-gray-500 rounded-full p-3 hover:bg-gray-300 ">
                <ImSpinner2 color="white" size={"20px"} />
              </div>
            )}
          </div>
        </div>

        <div className=" bg-black">
          <div className="mt-[10%] mx-4 p-2">
            <div className="border border-gray-400 rounded-">
              <input
                className="text-white bg-black  w-full text-2xl border-none outline-none py-3 px-2"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="border border-gray-400 rounded-md  mt-3">
              <textarea
                className="text-white bg-black  w-full text-2xl border-none outline-none px-2 py-3 resize-none"
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="border border-gray-400 rounded-md mt-3 mb-4">
              <input
                className="text-white bg-black  w-full text-2xl border-none outline-none px-2 py-3"
                type="text"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
