import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/userSlice";
import { useEffect } from "react";
const useGetProfile = async (id) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.post("/api/v1/user/getProfile", { id });
        dispatch(setProfile(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyProfile();
  }, [id, refresh]);
};

export default useGetProfile;
