const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Tweet = require("../models/tweetModel");

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        msg: "Please provide all field",
        success: false,
      });
    }

    const userData = await User.findOne({ email });

    if (userData) {
      return res.status(401).json({
        msg: "Email already exists",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      msg: "User registerd Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "User Registration failed",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        msg: "Please Provide all fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        msg: "Invalid Cradential",
        success: false,
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({
        msg: "Invalid Credential",
        success: false,
      });
    }

    const userId = user._id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(201).json({
      msg: "User login successfull",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Login failed",
      success: false,
    });
  }
};

const bookmark = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.userId;

    const user = await User.findById(userId);

    if (user.bookmark.includes(tweetId)) {
      await User.findByIdAndUpdate(userId, { $pull: { bookmark: tweetId } });
      res.status(201).json({
        msg: "Removed from bookmark",
      });
    } else {
      await User.findByIdAndUpdate(userId, { $push: { bookmark: tweetId } });
      res.status(201).json({
        msg: "Addsed to bookmark",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.body.id;
    const user = await User.findById(userId).select("-password");
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOtherUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.find({ _id: { $ne: userId } }).select("-password");
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const follower = async (req, res) => {
  try {
    const LogedUserId = req.userId;
    const otherUserId = req.params.id;

    const logedUser = await User.findById(LogedUserId);

    if (!logedUser.followings.includes(otherUserId)) {
      await User.findByIdAndUpdate(LogedUserId, {
        $push: { followings: otherUserId },
      });
      await User.findByIdAndUpdate(otherUserId, {
        $push: {
          followers: logedUser._id,
          notification: `${logedUser.name} followed you`,
          allNotification: `${logedUser.name} followed you`,
        },
      });

      return res.status(201).json({
        msg: "Followed Successfully",
      });
    } else {
      return res.status(201).json({
        msg: "Already Followed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const unfollow = async (req, res) => {
  try {
    const LogedUserId = req.userId;
    const otherUserId = req.params.id;

    const logedUser = await User.findById(LogedUserId);

    if (logedUser.followings.includes(otherUserId)) {
      await User.findByIdAndUpdate(LogedUserId, {
        $pull: { followings: otherUserId },
      });

      await User.findByIdAndUpdate(otherUserId, {
        $pull: { followers: LogedUserId },
        $push: {
          notification: `${logedUser.name} unfollowed you`,
          allNotification: `${logedUser.name} unfollowed you`,
        },
      });

      return res.status(201).json({
        msg: "UnFollowed Successfully",
      });
    } else {
      return res.status(201).json({
        msg: "Already UnFollowed ",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const clearNotification = async (req, res) => {
  try {
    const LogedUserId = req.userId;
    const logedUser = await User.findById(LogedUserId);
    await User.findByIdAndUpdate(LogedUserId, {
      $push: {
        seenNotification: [...logedUser.notification],
      },
      allNotification: [],
      notification: [],
    });

    return res.status(200).json({
      msg: "Notification Cleared SuccessFully",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteNotification = async (req, res) => {
  try {
    const LogedUserId = req.userId;
    const logedUser = await User.findById(LogedUserId);
    await User.findByIdAndUpdate(LogedUserId, {
      seenNotification: [],
    });
    return res.status(200).json({
      msg: "Notification Deleted SuccessFully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getFollowings = async (req, res) => {
  try {
    const LogedUserId = req.body.id;
    const user = await User.findById(LogedUserId);

    const followingUser = await Promise.all(
      user?.followings?.map((floingUser) => {
        return User.findById(floingUser);
      })
    );

    return res.status(201).json({
      followingUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const getFollowers = async (req, res) => {
  try {
    const LogedUserId = req.body.id;
    const user = await User.findById(LogedUserId);

    const followerUser = await Promise.all(
      user?.followers?.map((florsUser) => {
        return User.findById(florsUser);
      })
    );

    return res.status(201).json({
      follower: followerUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, username, avatar, banner, bio } = req.body;
    await User.findByIdAndUpdate(userId, {
      name,
      username,
      avatar,
      banner,
      bio,
    });

    const user = await User.findById(userId);

    await Tweet.updateMany(
      { userId },
      {
        $set: {
          userDetails: user,
        },
      }
    );

    return res.status(200).json({
      msg: "Profile Updated SuccessFully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  bookmark,
  getUser,
  getProfile,
  getOtherUser,
  follower,
  unfollow,
  clearNotification,
  deleteNotification,
  getFollowings,
  getFollowers,
  updateProfile,
};
