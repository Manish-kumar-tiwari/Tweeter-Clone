import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFollowingTweets } from "../redux/tweetSlice";
import { useEffect } from "react";

const useGetFollowingTweets = () => {
  const { refresh } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post("/api/v1/tweet/getFollowingTweets", {
          token,
        });
        dispatch(setFollowingTweets(res.data.tweet));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refresh]);
};

export default useGetFollowingTweets;
