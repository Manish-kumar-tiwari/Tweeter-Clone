const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    like: {
      type: Array,
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
    userDetails: [],
    comments: {
      type: Array,
    },
  },

  {
    timestamps: true,
  }
);

const Tweet = mongoose.model("tweet", tweetSchema);
module.exports = Tweet;
