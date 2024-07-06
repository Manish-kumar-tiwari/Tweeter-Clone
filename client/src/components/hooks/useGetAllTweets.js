import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllTweets,
  setFollowingTweets,
  setTotalTweets,
} from "../redux/tweetSlice";
import { useEffect } from "react";
import { setBookmarkTweets } from "../redux/userSlice";

const useGetAllTweets = () => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchAllTweets = async () => {
      try {
        const res = await axios.post("/api/v1/tweet/getAllTweets", { token });
        dispatch(setAllTweets(res.data.tweet));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFollowingTweets = async () => {
      try {
        const res = await axios.post("/api/v1/tweet/getFollowingTweets", {
          token,
        });
        dispatch(setFollowingTweets(res.data.tweet));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBookmarkTweets = async () => {
      try {
        const res = await axios.post("/api/v1/tweet/bookmarkTweet", {
          token,
        });
        dispatch(setBookmarkTweets(res.data.tweet));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTotalTweets = async () => {
      try {
        const res = await axios.get("/api/v1/tweet/getTotalTweet");

        dispatch(setTotalTweets(res.data.tweets));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllTweets();
    fetchFollowingTweets();
    fetchBookmarkTweets();
    fetchTotalTweets();
  }, [refresh]);
};

export default useGetAllTweets;
