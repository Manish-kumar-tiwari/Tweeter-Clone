import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import { useEffect } from "react";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post("/api/v1/user/getOtherUser", { token });
        dispatch(setOtherUsers(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  });
};

export default useGetOtherUsers;
