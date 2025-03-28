import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SmartButton = styled(Button)(({ theme }) => ({
  transition: theme.transitions.create(["background", "background-color", "background-image", "box-shadow", "border-color"], {
    duration: theme.transitions.duration.complex,
  }),
  background: "rgba(246,254,246,1)",
  backgroundImage: "radial-gradient(circle, rgba(246,254,246,1) 0%, rgba(229,249,249,1) 100%)",
  backgroundRepeat: "no-repeat",
  color: theme.palette.text.primary,
  border: 1,
  borderStyle: "solid",
  borderColor: "rgba(93, 191, 199, 1)",
  "&:hover": {
    backgroundImage: "none",
    borderColor: theme.palette.primary.light,
  },
}));

const SmartButton2 = styled(Button)(({ theme }) => ({
  transition: theme.transitions.create(["background", "background-color", "background-image", "box-shadow", "border-color"], {
    duration: theme.transitions.duration.complex,
  }),
  textTransform: "none",
  backgroundColor: theme.palette.smartminds.main,
  color: theme.palette.text.primary,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",
  "&:hover, &:active, &:focus": {
    backgroundColor: theme.palette.smartminds.dark,
    borderColor: theme.palette.text.primary,
  },
  "&.active": {
    backgroundColor: theme.palette.smartminds.light,
    borderColor: theme.palette.smartminds.dark,
  },
}));
export { SmartButton, SmartButton2 };
