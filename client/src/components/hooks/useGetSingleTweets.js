import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleTweets } from "../redux/tweetSlice";

const useGetSingleTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);
  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const res = await axios.get(`/api/v1/tweet/getSingleTweet/${id}`);
        console.log(res);

        dispatch(setSingleTweets(res.data.tweet));
      } catch (error) {
        console.log(error);
      }
    };

    fetchTweet();
  }, [id, refresh]);
};

export default useGetSingleTweets;
