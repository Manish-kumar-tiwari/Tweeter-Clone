const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    followings: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    bookmark: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    avatar: {
      type: String,
      default: "https://images5.alphacoders.com/974/thumb-350-974363.jpg",
    },

    banner: {
      type: String,
      default:
        "https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360",
    },

    bio: {
      type: String,
    },

    notification: {
      type: Array,
      default: [],
    },

    seenNotification: {
      type: Array,
      default: [],
    },

    allNotification: {
      type: Array,
      default: [],
    },

    extraDetails: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
