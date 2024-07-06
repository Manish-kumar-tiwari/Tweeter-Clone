import * as React from "react";

import Dialog from "@mui/material/Dialog";

import CreatePost from "./CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { setPost } from "./redux/userSlice";
import { Divider } from "@mui/material";

export default function CreatePostDialog() {
  const { post } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setPost(false));
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="md"
        className=" bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border border-gray-400 p-3 px-5 "
        open={post}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="bg-black">
          <div>
            <RxCross1
              color="white"
              size={"50px"}
              className="m-2 hover:bg-gray-900 p-2 rounded-full"
              onClick={handleClose}
            />
          </div>

          <CreatePost />
        </div>
      </Dialog>
    </React.Fragment>
  );
}
