import { styled, Box, Toolbar, TextField, alpha, InputBase } from "@mui/material";

export const HeaderWraper = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`;

export const LogoTitle = styled(Box)`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FavCartContainer = styled(Box)`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserContainer = styled(Box)`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchInput = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: "lightgrey",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
