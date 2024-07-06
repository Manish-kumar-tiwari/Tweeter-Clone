import "./App.css";
import Body from "./components/Body";
import io from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "./components/redux/userSlice";
import { setSocket } from "./components/redux/socketSlice";

function App() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:8080", {
        query: {
          userId: user?._id,
        },
      });

      dispatch(setSocket(socket));
     

      socket.on("onlineUsers", (user) => {
        dispatch(setOnlineUsers(user));
      });

      return ()=>socket.close();
    }
  }, [user]);

  return (
    <div className="my-4">
      <Body />
    </div>
  );
}

export default App;
