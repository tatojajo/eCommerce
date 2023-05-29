import { styled, Box, Toolbar, TextField, FormControl } from "@mui/material";

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

export const RoundedTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    background-color: #f0f0f0;
    width: 200px;
    height: 48px;
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-left-color: blue;
    border-top-color: blue;
    border-bottom-color: blue;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-top: 2px solid #ced4da;
    border-bottom: 2px solid #ced4da;
    border-left: 2px solid #ced4da;
    border-right: transparent;
  }
`;

export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderTop: state.isFocused ? "2px solid #3366ff" : "2px solid #ced4da",
    borderBottom: state.isFocused ? "2px solid #3366ff" : "2px solid #ced4da",
    borderRight: state.isFocused ? "2px solid #3366ff" : "2px solid #ced4da",
    borderLeft: state.isFocused ? "none" : "none",
    height: "48px",
    maxWidth: "160px",
    minWidth: "160px",
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",

    "&:hover": {
      borderColor: "#3366ff",
      borderTopColor: "blue",
      borderBottomColor: "blue",
      borderRightColor: "blue",
      borderLeftColor: "transparent",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#3366ff" : "transparent",
    color: state.isSelected ? "#ffffff" : "#333333",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#6c757d",
  }),
};
