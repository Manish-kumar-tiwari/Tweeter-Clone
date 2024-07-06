import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchMessage = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`/api/v1/message/${selectedUser?._id}`, {
          token,
        });

        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, [selectedUser]);
};

export default useGetMessages;
