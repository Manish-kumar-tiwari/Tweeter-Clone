const express = require("express");
const dotenv = require("dotenv");

const { server, app } = require("./socket/socket");
const connectDb = require("./config/connectDb");
const UserRouter = require("./routes/userRoutes");
const TweetRouter = require("./routes/tweetRoutes");
const MessageRouter = require("./routes/messageRoutes");
const path = require("path");
const cors = require("cors");

dotenv.config();

// const app = express();
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));

connectDb();

app.use(express.json());
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/tweet", TweetRouter);
app.use("/api/v1/message", MessageRouter);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(process.env.PORT, () => {
  console.log(`Sever is Listining at port ${process.env.PORT}`);
});
