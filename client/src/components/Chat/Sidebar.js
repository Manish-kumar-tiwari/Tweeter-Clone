import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const homeHandler = () => {
    dispatch(setSelectedUser(null));
    navigate("/");
  };

  const { selectedUser, user } = useSelector((store) => store.user);

  return (
    <div
      className={` ${
        selectedUser && "max-[800px]:hidden "
      } max-[800px]:w-full border-r-2 border-gray-200 w-[30%] h-svh  `}
    >
      <div className="flex w-full rounded-full bg-gray-500 items-center p-1 mt-7">
        <FaSearch size={"34px"} className="px-1" color="white" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full rounded-full text-3xl text-white p-1 border-none outline-none bg-gray-500 "
        />
      </div>

      <div className="mt-4 ">
        <OtherUsers search={search} />
        <button
          onClick={homeHandler}
          className=" absolute p-2  bg-slate-500 bottom-16 px-4 rounded-full text-lg font-semibold text-white hover:bg-blue-400"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
