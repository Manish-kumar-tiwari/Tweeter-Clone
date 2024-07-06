const express = require("express");
const {
  register,
  login,
  bookmark,
  getOtherUser,
  follower,
  unfollow,
  getUser,
  getProfile,
  clearNotification,
  deleteNotification,
  getFollowings,
  getFollowers,
  updateProfile,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/bookmark/:id", authMiddleware, bookmark);
router.post("/getUser", authMiddleware, getUser);
router.post("/getProfile", getProfile);
router.post("/getOtherUser", authMiddleware, getOtherUser);
router.put("/follow/:id", authMiddleware, follower);
router.put("/unFollow/:id", authMiddleware, unfollow);
router.put("/clearNottfication", authMiddleware, clearNotification);
router.put("/deleteNotification", authMiddleware, deleteNotification);
router.post("/getFollowings",  getFollowings);
router.post("/getFollowers",  getFollowers);
router.post("/updateProfile", authMiddleware, updateProfile);

module.exports = router;
