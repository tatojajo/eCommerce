import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Details from "./Details";

import { LocalMall, PersonOutline, Place } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  UserInfoDetails,
  UserInfoPaper,
  UserPageContainer,
  UserPageTitle,
} from "./UserPageStyle";
import Address from "./Address";

const User = () => {
  const [selectedInfo, setSelectedInfo] = useState("My Details");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectedInfo = (info: string) => {
    setSelectedInfo(info);
    navigate(`?selected=${encodeURIComponent(info)}`, { replace: true });
  };
  return (
    <UserPageContainer>
      <UserPageTitle variant="h4" color="initial">
        {t("global.my_acount")}
      </UserPageTitle>
      <UserInfoDetails>
        <Box sx={{ width: "20%" }}>
          <List sx={{ maxWidth: 360, bgcolor: "background.paper" }}>
            <ListItem
              sx={{ cursor: "pointer" }}
              onClick={() => {
                handleSelectedInfo("My Details");
              }}
            >
              <ListItemAvatar>
                <PersonOutline />
              </ListItemAvatar>
              <ListItemText primary={t("global.my_details")} />
            </ListItem>
            <ListItem
              sx={{ cursor: "pointer" }}
              onClick={() => {
                handleSelectedInfo("My Address");
              }}
            >
              <ListItemAvatar>
                <Place />
              </ListItemAvatar>
              <ListItemText primary={t("global.my_address")} />
            </ListItem>
            <ListItem
              sx={{ cursor: "pointer" }}
              onClick={() => {
                handleSelectedInfo("My Orders");
              }}
            >
              <ListItemAvatar>
                <LocalMall />
              </ListItemAvatar>
              <ListItemText primary={t("global.my_orders")} />
            </ListItem>
          </List>
        </Box>
        <UserInfoPaper elevation={5}>
          {(() => {
            if (selectedInfo === "My Details") {
              return <Details />;
            } else if(selectedInfo === "My Address") {
              return <Address />;
            }
          })()}
        </UserInfoPaper>
      </UserInfoDetails>
    </UserPageContainer>
  );
};

export default User;
