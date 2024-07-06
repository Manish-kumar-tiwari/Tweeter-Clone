const express = require("express");
const {
  createTweet,
  deleteTweet,
  likeDislike,
  getAllTweets,
  getFollowingTweets,
  getBookmarkTweet,
  postComment,
  getSingleTweet,
  getTotalTweet,
  getProfileTweets,
} = require("../controllers/tweetCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/bookmarkTweet", authMiddleware, getBookmarkTweet);
router.post("/create", authMiddleware, createTweet);
router.post("/delete/:id", authMiddleware, deleteTweet);
router.put("/like/:id", authMiddleware, likeDislike);
router.post("/getAllTweets", authMiddleware, getAllTweets);
router.post("/getFollowingTweets", authMiddleware, getFollowingTweets);
router.post("/postComment/:id", authMiddleware, postComment);
router.get("/getSingleTweet/:id", getSingleTweet);
router.get("/getTotalTweet", getTotalTweet);
router.get("/getProfileTweet/:id", getProfileTweets);

module.exports = router;
