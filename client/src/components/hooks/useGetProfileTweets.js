import  { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setprofileTweets } from "../redux/tweetSlice";

const useGetProfileTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);
  useEffect(() => {
    const fetchProfileTweets = async () => {
      try {
        const res = await axios.get(`/api/v1/tweet/getProfileTweet/${id}`);
        dispatch(setprofileTweets(res.data.tweets));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileTweets();
  }, [id, refresh]);
};

export default useGetProfileTweets;
