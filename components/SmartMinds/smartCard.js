import MuiCard from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import MuiCardActionArea from "@mui/material/CardActionArea";
import { styled } from "@mui/material/styles";

const SmartCard = styled(MuiCard)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: theme.spacing(2),
  gap: theme.spacing(1),
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  backgroundColor: theme.palette.smartminds.main,
  color: theme.palette.smartminds.contrastText,
  border: "1px solid transparent",
  "&:hover": {
    backgroundColor: theme.palette.smartminds.dark,
    borderColor: theme.palette.smartminds.contrastText,
  },
}));
const SmartCardActionArea = styled(MuiCardActionArea)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "start",
  alignItems: "start",
}));
const SmartCardContent = styled(MuiCardContent)(({ theme }) => ({
  gap: theme.spacing(1),
}));
export { SmartCard, SmartCardContent, SmartCardActionArea };
