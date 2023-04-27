import { styled,Box } from "@mui/material";


export const CardContainer = styled(Box)`
width:300px;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
background-color: slategray;
padding: 15px;
border-radius: 10px;
`

export const ImageWrapper = styled(Box)`
position:relative;
width: 200px;
height: 200px;
background-repeat: no-repeat;
background-position: center center;
background-size: cover;
object-fit: contain;
`

export const CardImage = styled('img')`
width: 200px;
object-fit: contain;
`