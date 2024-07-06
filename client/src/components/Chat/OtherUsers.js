import React from "react";
import OtherUser from "./OtherUser";
import { useSelector } from "react-redux";

const OtherUsers = ({ search }) => {
  const { otherUsers } = useSelector((store) => store.user);

  if (!otherUsers) {
    return;
  }

  return (
    <div className="overflow-auto h-[80%] ">
      {otherUsers
        .filter((user) =>
          user.name.toLowerCase().includes(search.trim().toLowerCase())
        )
        ?.map((user, idx) => {
          return <OtherUser user={user} key={idx} />;
        })}

      {otherUsers?.filter((user) =>
        user.name.toLowerCase().includes(search.trim().toLowerCase())
      )?.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white"> No User found!</h1>
        </div>
      )}
    </div>
  );
};

export default OtherUsers;
