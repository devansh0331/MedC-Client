import React from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Card,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import altprofile from "../assets/altprofile.png";
import { IoPersonAddOutline } from "react-icons/io5";

const YouMayKnow = (props) => {
  return (
    <Card className="">
      <Typography className="border-b-2 py-3 px-4 text-lg">
        People you may know
      </Typography>
      <Card className="overflow-y-scroll scrollbar-thin h-96">
        <List>
          {props.data.length == 0 ? (
            <ListItem></ListItem>
          ) : (
            props.data.map((user) => (
              <ListItem>
                <ListItemPrefix>
                  <Avatar
                    className="w-9 h-9"
                    src={user.profileURL ? user.profileURL : altprofile}
                    alt="altprofile"
                  />
                </ListItemPrefix>
                <div className="flex flex-col">
                  <Typography className="font-medium text-sm">{user.name}</Typography>
                  {user.bio && (
                    <Typography className="text-sm text-gray-600">{user.bio ? user.bio : "New User"}</Typography>
                  )}
                </div>
                <ListItemSuffix>
                  <div className="border-[1px] p-1 rounded-full border-gray-400">
                    <IoPersonAddOutline className="w-4 h-4 text-gray-500" />
                  </div>
                </ListItemSuffix>
              </ListItem>
            ))
          )}
        </List>
      </Card>
    </Card>
  );
};

export default YouMayKnow;
