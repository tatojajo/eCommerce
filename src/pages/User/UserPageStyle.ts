import { styled, Box, Typography, Paper } from "@mui/material";

export const UserPageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: start;
  justifay-content:start ;
  padding:20px;
  margin-top:50px;
  
`;

export const UserPageTitle = styled(Typography)`
font-weight:700;
margin-bottom:20px;
`

export const UserInfoDetails = styled(Box)`
display: flex;
align-items: start;
justifay-content: center;
gap:20px
`

export const UserInfoPaper  =styled(Paper)`
width:80%;
padding:50px;
display: flex;
flex-direction: column;
align-items: start;
justifay-content:start ;
`
