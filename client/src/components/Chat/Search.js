import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const Search = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  if (!selectedUser) {
    return;
  }

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `/api/v1/message/sendMessage/${selectedUser?._id}`,
        { message, token }
      );

      setMessage("");

      if (messages === null) {
        dispatch(setMessages([res.data.newMessage]));
      } else {
        dispatch(setMessages([...messages, res.data.newMessage]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full  rounded-md">
      <form className="w-full " onSubmit={(e) => submitHandler(e)}>
        <div className="w-full flex items-center bg-zinc-700 rounded-md">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-zinc-700 py-4 px-3 border-none outline-none text-2xl rounded-xl text-white"
            type="text"
            placeholder="Send a message..."
          />
          <button type="submit">
            <IoSend className="mr-3" size={"34px"} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
