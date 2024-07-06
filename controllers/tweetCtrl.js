const Tweet = require("../models/tweetModel");
const User = require("../models/userModel");

const createTweet = async (req, res) => {
  try {
    const { description, imguri } = req.body;
    const userId = req.userId;
    if ((!description && !imguri) || !userId) {
      return (
        res.status(401),
        json({
          msg: "All Fields are required ",
          success: false,
        })
      );
    }

    const user = await User.findById(userId);

    await Tweet.create({
      description,
      userId,
      userDetails: user,
      image: imguri,
    });

    return res.status(201).json({
      msg: "Tweet created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Something Went Wrong",
      success: false,
    });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (user.bookmark.includes(tweetId)) {
      await User.findByIdAndUpdate(userId, {
        $pull: {
          bookmark: tweetId,
        },
      });
    }
    await Tweet.findByIdAndDelete(tweetId);
    return res.status(201).json({
      msg: "Tweet Delete SuccessFully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Something Went wrong",
      success: false,
    });
  }
};

const likeDislike = async (req, res) => {
  try {
    const userId = req.userId;
    const tweetId = req.params.id;

    const tweet = await Tweet.findById(tweetId);
    const user = await User.findById(tweet.userId);
    if (tweet.like.includes(userId)) {
      await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: userId } });

      await User.findByIdAndUpdate(tweet.userId, {
        $push: {
          notification: `${user.name} Dislike your tweet`,
          allNotification: `${user.name} Dislike your tweet`,
        },
      });
      return res.status(200).json({
        msg: "Dislike post",
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, { $push: { like: userId } });

      await User.findByIdAndUpdate(tweet.userId, {
        $push: {
          notification: `${user.name} like your tweet`,
          allNotification: `${user.name} like your tweet`,
        },
      });
      return res.status(200).json({
        msg: "like post",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllTweets = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    const postedTweet = await Tweet.find({ userId });

    const followingTweet = await Promise.all(
      user?.followings?.map((followingUser) => {
        return Tweet.find({ userId: followingUser });
      })
    );

    return res.status(200).json({
      tweet: postedTweet.concat(...followingTweet),
    });
  } catch (error) {
    console.log(error);
  }
};

const getFollowingTweets = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    const followingTweet = await Promise.all(
      user?.followings?.map((followingUser) => {
        return Tweet.find({ userId: followingUser });
      })
    );

    return res.status(200).json({
      tweet: [].concat(...followingTweet),
    });
  } catch (error) {
    console.log(error);
  }
};

const getBookmarkTweet = async (req, res) => {
  try {
    const LogedUserId = req.userId;
    const user = await User.findById(LogedUserId);

    const bookmarkTweets = await Promise.all(
      user?.bookmark?.map((bookmarkTweetId) => {
        return Tweet.find({ _id: bookmarkTweetId });
      })
    );

    return res.status(201).json({
      tweet: bookmarkTweets,
    });
  } catch (error) {
    console.log(error);
  }
};

const postComment = async (req, res) => {
  try {
    const userId = req.userId;
    const tweetId = req.params.id;
    const { post, imguri } = req.body;

    let user = await User.findById(userId);

    if (post) {
      user.extraDetails = {
        post,
      };
    }

    if (imguri) {
      user.extraDetails = {
        photo: imguri,
      };
    }

    if (post && imguri) {
      user.extraDetails = {
        photo: imguri,
        post,
      };
    }

    await Tweet.findByIdAndUpdate(tweetId, {
      $push: {
        comments: user,
      },
    });

    return res.status(200).json({
      msg: "posted",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);

    return res.status(201).json({
      tweet,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTotalTweet = async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.status(200).json({
      tweets,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProfileTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const tweets = await Tweet.find({ userId: id });
    return res.status(201).json({
      tweets,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
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
};
