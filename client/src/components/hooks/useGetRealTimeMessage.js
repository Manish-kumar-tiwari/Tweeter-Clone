import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessages = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);

  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      if (messages === null) {
        dispatch(setMessages([message]));
      } else {
        dispatch(setMessages([...messages, message]));
      }
    });
  }, [socket, messages]);
};

export default useGetRealTimeMessages;
