const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { sendMessage, getMessage } = require("../controllers/messageCtrl");

const routes = express.Router();

routes.post("/sendMessage/:id", authMiddleware, sendMessage);
routes.post("/:id", authMiddleware, getMessage);

module.exports = routes;
