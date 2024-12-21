import React, { useContext, useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Card,
  Typography,
} from "@material-tailwind/react";
import altprofile from "../assets/altprofile.png";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import YouMayKnowUser from "./YouMayKnowUser";

const YouMayKnow = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { sendRequest } = useContext(UserContext);

  const notConnectedUsers = async () => {
    const response = await fetch(`${SERVER_URL}/user/not-connected-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await response.json();
    setAllUsers(data.data);
  };

  useEffect(() => {
    notConnectedUsers();
  }, []);
  return (
    <Card className="">
      <Typography className="border-b-2 py-3 px-4 text-lg">
        People you may know
      </Typography>
      <Card className="overflow-y-scroll scrollbar-thin h-96">
        <List>
          {allUsers &&
            allUsers?.map((user) => (
              // <ListItem className="cursor-default">
              //   <ListItemPrefix>
              //     <img
              //       className="w-9 h-9 rounded-full profile-pic "
              //       src={user.profileURL ? user.profileURL : altprofile}
              //       alt="altprofile"
              //     />
              //   </ListItemPrefix>
              //   <Link to={`/user/${user._id}`}>
              //     <div className="flex flex-col">
              //       <Typography className="font-medium text-sm">
              //         {user.name}
              //       </Typography>
              //       {user.bio && (
              //         <Typography className="text-sm text-gray-600">
              //           {user.bio ? user.bio : "New User"}
              //         </Typography>
              //       )}
              //     </div>
              //   </Link>
              //   <ListItemSuffix>
              //     <div className="border-[1px] p-1 rounded-full border-gray-400">
              //       <IoPersonAddOutline
              //         className="w-4 h-4 text-gray-500 cursor-pointer"
              //         onClick={() => sendRequest(user._id)}
              //       />
              //     </div>
              //   </ListItemSuffix>
              // </ListItem>
              <YouMayKnowUser key={user._id} user={user} />
            ))}
        </List>
      </Card>
    </Card>
  );
};

export default YouMayKnow;
