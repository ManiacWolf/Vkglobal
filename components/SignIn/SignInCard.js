import { useState } from "react";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";
import { SELF_LOGIN_API } from "@/helpers/constants";
import { useRouter } from "next/router";
import { useCookiesNext } from "cookies-next";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { SmartButton } from "../SmartMinds";
import Image from "next/image";

const Card2 = styled(MuiCard)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",

  /* maxWidth: 450,
  [theme.breakpoints.up("sm")]: {
    width: 450,
  }, */
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  /* [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),*/
}));

export default function SignInCard() {
  const router = useRouter();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { setCookie, hasCookie, deleteCookie, getCookies, getCookie } = useCookiesNext();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const body = {
      username: data.get("email"),
      password: data.get("password"),
    };
    axios
      .post(SELF_LOGIN_API, body)
      .then((response) => {
        setMessage(null);
        const data = response.data;
        if (!data.is_verified || !data.is_active) {
          setCookie("name", data.name);
          setCookie("is_verified", data.is_verified);
          setCookie("is_active", data.is_active);
          router.push("/wait");
        } else {
          setCookie("name", data.name);
          setCookie("role", data.user_type);
          setCookie("is_verified", data.is_verified);
          setCookie("is_active", data.is_active);
          setCookie("token", data.token);
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ width: { xs: 100, md: 115, xl: 135 }, height: { xs: 0.143356164383562 * 100, md: 0.143356164383562 * 115, xl: 0.143356164383562 * 135 }, position: "relative", mx: "auto" }}>
          <Image src={"/smart-minds.svg"} fill={true} quality={100} alt="S.M.A.R.T. Minds" />
        </Box>
        <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
          <FormControl>
            <TextField error={emailError} helperText={emailErrorMessage} id="email" type="email" name="email" placeholder="your@email.com" autoComplete="email" autoFocus required fullWidth label="Email/Username" variant="standard" color={emailError ? "error" : "primary"} />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Link component="button" type="button" underline="hover" onClick={handleClickOpen} variant="subtitle2">
                Forgot your password?
              </Link>
            </Box>
            <TextField error={passwordError} helperText={passwordErrorMessage} name="password" placeholder="••••••" type="password" id="password" autoComplete="current-password" autoFocus required fullWidth variant="standard" label="Password" color={passwordError ? "error" : "primary"} />
          </FormControl>

          <ForgotPassword open={open} handleClose={handleClose} />
          <Typography sx={{ textAlign: "center", margin: "8px auto" }} variant="body2" display={message ? "block" : "none"} color={message ? "error" : "primary"}>
            {message}
          </Typography>
          <SmartButton type="submit" variant="contained" fullWidth size="large" onClick={validateInputs}>
            Sign In
          </SmartButton>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <SmartButton href="/sign-up/" size="small">
              Sign Up
            </SmartButton>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
