import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const useGetUser = () => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/v1/user/getUser", { token });
        dispatch(setUser(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refresh]);
};

export default useGetUser;
