import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Feed from "./Feed";
import Profile from "./Profile";
import Login from "./Login";
import Bookmark from "./Bookmark";
import Notification from "./Notification";
import FollowedFollowing from "./FollowedFollowing";
import CommentList from "./CommentList";
import Explore from "./Explore";
import ChatHomepage from "./Chat/ChatHomepage";
import Connect from "./Connect";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },

        {
          path: "/profile/:id",
          element: <Profile />,
        },

        {
          path: "/bookmark",
          element: <Bookmark />,
        },

        {
          path: "/followFollowing/:id",
          element: <FollowedFollowing />,
        },

        {
          path: "/notification",
          element: <Notification />,
        },
        {
          path: "/comment/:id",
          element: <CommentList />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/connect",
          element: <Connect />,
        },
      ],
    },
    { path: "/chat", element: <ChatHomepage /> },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
