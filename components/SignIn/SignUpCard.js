import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Box, CardContent, Chip, Container, Divider, Grid2, Link } from "@mui/material";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { USER_CREATE_API, USER_PHONE_VERIFY } from "@/helpers/constants";
import { useRouter } from "next/router";
import { useCookiesNext } from "cookies-next";
import Image from "next/image";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  margin: "16px auto",
  width: "100%",
  maxWidth: 768,
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  borderRadius: 2,
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignUpCard() {
  const router = useRouter();
  const { setCookie } = useCookiesNext();
  const [errors, setErrors] = useState({ phone: true, email: true, password: true });
  const [errorMessages, setErrorMessages] = useState({});
  const [values, setValues] = useState({
    date_of_joining: "2025-01-01",
    date_of_signin: "2025-01-01",
    is_verified: false,
    is_active: false,
    user_role: 0,
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    name: "",
    designation: "",
    subject: "",
    school_address: "",
    school_city: "",
    school_name: "",
    school_state: "",
    postal_code: "",
  });

  const verify = async () => {
    await axios
      .post(USER_PHONE_VERIFY, { phone: values.phone, email: values.email }, { responseType: "application/json" })
      .then((response) => {
        const data = JSON.parse(response.data);
        const esettings = {};
        const msettings = {};
        if (data.phone) {
          esettings.phone = true;
          msettings.phone = `Mobile no. already in use.`;
        }
        if (data.email) {
          esettings.email = true;
          msettings.email = `Email address already in use`;
        }
        setErrors({ ...errors, ...esettings });
        setErrorMessages({ ...errorMessages, ...msettings });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    Object.keys(values).map((k) => {
      if (k != "postal_code" && values[k]?.length === 0 && isValid) {
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }
    const user_id = uuid();
    const body = {
      user_id: user_id,
      date_of_joining: values.date_of_joining,
      date_of_signin: values.date_of_signin,
      is_verified: 0,
      is_active: 0,
      user_role: 0,
      name: values.name,
      email: values.email,
      password: values.password,
      mobile: values.phone,
      teacher: {
        user_id: user_id,
        designation: values.designation,
        subject: values.subject,
        school_name: values.school_name,
        school_address: values.school_address,
        school_city: values.school_city,
        school_state: values.school_state,
        postal_code: values.postal_code,
      },
    };
    axios
      .post(USER_CREATE_API, body, { responseType: "application/json" })
      .then((response) => {
        const data = { ...response.data };
        setCookie("name", data.name);
        setCookie("email", data.email);
        setCookie("phone", data.mobile);
        setCookie("is_verified", false);
        setCookie("is_active", false);
        router.push("/wait");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const validateNset = (e) => {
    const error = { ...errors };
    const message = { ...errorMessages };
    const value = { ...values };
    const input = e.target;

    switch (input.name) {
      case "email":
        value.email = input.value;
        if (!input.value) {
          error.email = true;
          message.email = "Please enter a valid email address.";
        }
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
          error.email = true;
          message.email = "Please enter a valid email address.";
        } else {
          delete error.email;
          delete message.email;
        }
        break;
      case "password":
        value.password = input.value;
        if (!input.value || input.value.length < 6) {
          error.password = true;
          message.password = "Password must be at least 6 characters long.";
        } else {
          delete error.password;
          delete message.password;
        }
        break;
      case "cpassword":
        value.cpassword = input.value;
        if (!input.value || input.value.length < 6 || input.value != value.password) {
          error.cpassword = true;
          message.cpassword = "Confirm password mismatched.";
        } else {
          delete error.cpassword;
          delete message.cpassword;
        }
        break;
      case "phone":
        value.phone = input.value;
        if (!input.value || input.value.length < 10) {
          error.phone = true;
          message.phone = "Please enter a valid mobile number.";
        } else {
          delete error.phone;
          delete message.phone;
        }
        break;
      case "name":
        value.name = input.value;
        if (!input.value || input.value.length < 3) {
          error.name = true;
          message.name = "Please enter your name.";
        } else {
          delete error.name;
          delete message.name;
        }
        break;
      case "subject":
        value.subject = input.value;
        if (!input.value || input.value.length < 3) {
          error.subject = true;
          message.subject = "Please enter your subject.";
        } else {
          delete error.subject;
          delete message.subject;
        }
        break;
      case "designation":
        value.designation = input.value;
        if (!input.value || input.value.length < 2) {
          error.designation = true;
          message.designation = "Please enter your designation.";
        } else {
          delete error.designation;
          delete message.designation;
        }
        break;
      case "school_name":
        value.school_name = input.value;
        if (!input.value || input.value.length < 2) {
          error.school_name = true;
          message.school_name = "Please enter your school/institute name.";
        } else {
          delete error.school_name;
          delete message.school_name;
        }
        break;
      case "school_address":
        value.school_address = input.value;
        if (!input.value || input.value.length < 2) {
          error.school_address = true;
          message.school_address = "Please enter your school/institute street address.";
        } else {
          delete error.school_address;
          delete message.school_address;
        }
        break;
      case "school_city":
        value.school_city = input.value;
        if (!input.value || input.value.length < 2) {
          error.school_city = true;
          message.school_city = "Please enter your school/institute street city or district name.";
        } else {
          delete error.school_city;
          delete message.school_city;
        }
        break;
      case "school_state":
        value.school_state = input.value;
        if (!input.value || input.value.length < 2) {
          error.school_state = true;
          message.school_state = "Please enter your school/institute street state name.";
        } else {
          delete error.school_state;
          delete message.school_state;
        }
        break;
    }

    setErrorMessages(message);
    setErrors(error);
    setValues(value);
  };
  const validateInputs = () => {
    let isValid = true;
    if (values && Object.keys(values).length > 0) {
      Object.keys(values).map((k) => {
        if (k != "postal_code" && values[k]?.length === 0 && isValid) {
          isValid = false;
        }
      });
    } else {
      isValid = false;
    }
    return isValid;
  };

  return (
    <Container maxWidth="lg">
      <Card variant="outlined">
        <CardContent>
          <Grid2 container component="form" onSubmit={handleSubmit} alignItems={"stretch"} noValidate spacing={3}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ width: { xs: 100, md: 115, xl: 135 }, height: { xs: 0.143356164383562 * 100, md: 0.143356164383562 * 115, xl: 0.143356164383562 * 135 }, position: "relative" }}>
                <Image src={"/smart-minds.svg"} fill={true} quality={100} alt="S.M.A.R.T. Minds" />
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography component={"div"} variant="h5" sx={{ fontSize: "clamp(1.5rem, 7vw, 1.65rem)", textAlign: { xs: "start", md: "end" } }}>
                Sign Up
              </Typography>
            </Grid2>
            <Divider style={{ width: "100%" }}>
              <Chip label="Account Info." variant="outlined" size="small" />
            </Divider>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth={true}>
                <TextField
                  error={errors?.phone}
                  helperText={errorMessages?.phone ?? ""}
                  id="phone"
                  value={values?.phone}
                  onChange={(e) => validateNset(e)}
                  onBlur={() => verify()}
                  type="tel"
                  name="phone"
                  placeholder="Your mobile no."
                  autoComplete="phone"
                  required
                  fullWidth
                  slotProps={{ htmlInput: { maxLength: 13 } }}
                  label="Mobile No."
                  variant="standard"
                  color={errors.phone ? "error" : "primary"}
                />
                <Typography component="p" variant="body2">
                  Your mobile number can be used to verify your account.
                </Typography>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth={true}>
                <TextField
                  value={values?.email ?? ""}
                  onChange={(e) => validateNset(e)}
                  onBlur={() => verify()}
                  error={errors?.email}
                  helperText={errorMessages?.email}
                  slotProps={{ htmlInput: { maxLength: 125 } }}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  fullWidth
                  label="Email/Username"
                  variant="standard"
                  color={errors.email ? "error" : "primary"}
                />

                <Typography component="p" variant="body2">
                  Your email ID will be your username and will be used to verify your account.
                </Typography>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth={true}>
                <TextField
                  value={values?.password ?? ""}
                  onChange={(e) => validateNset(e)}
                  error={errors?.password}
                  helperText={errorMessages?.password}
                  slotProps={{ htmlInput: { maxLength: 50 } }}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="standard"
                  label="Password"
                  color={errors.password ? "error" : "primary"}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth={true}>
                <TextField
                  value={values?.cpassword ?? ""}
                  onChange={(e) => validateNset(e)}
                  error={errors?.cpassword}
                  helperText={errorMessages?.cpassword}
                  name="cpassword"
                  placeholder="••••••"
                  type="password"
                  id="cpassword"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="standard"
                  label="Confirm Password"
                  color={errors.cpassword ? "error" : "primary"}
                />
              </FormControl>
            </Grid2>

            <Divider style={{ width: "100%" }}>
              <Chip label="Professional Info." variant="outlined" size="small" />
            </Divider>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth={true}>
                <TextField
                  value={values?.name ?? ""}
                  onChange={(e) => validateNset(e)}
                  slotProps={{ htmlInput: { maxLength: 150 } }}
                  id="name"
                  type="text"
                  name="name"
                  placeholder="your name"
                  autoComplete="name"
                  required
                  fullWidth
                  label="Name"
                  variant="standard"
                  error={errors?.name}
                  helperText={errorMessages?.name}
                  color={errors.name ? "error" : "primary"}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth={true}>
                <TextField
                  id="designation"
                  value={values?.designation ?? ""}
                  onChange={(e) => validateNset(e)}
                  type="text"
                  name="designation"
                  slotProps={{ htmlInput: { maxLength: 50 } }}
                  placeholder="PGT/TGT/Lecturer etc."
                  autoComplete="none"
                  required
                  fullWidth
                  label="Designation"
                  variant="standard"
                  error={errors?.designation}
                  helperText={errorMessages?.designation}
                  color={errors.designation ? "error" : "primary"}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <FormControl fullWidth={true}>
                <TextField
                  id="subject"
                  value={values?.subject ?? ""}
                  onChange={(e) => validateNset(e)}
                  slotProps={{ htmlInput: { maxLength: 140 } }}
                  type="text"
                  name="subject"
                  placeholder="subject"
                  autoComplete="none"
                  fullWidth
                  required
                  label="Subject"
                  variant="standard"
                  error={errors?.subject}
                  helperText={errorMessages?.subject}
                  color={errors.subject ? "error" : "primary"}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth={true}>
                <TextField
                  value={values?.school_name ?? ""}
                  onChange={(e) => validateNset(e)}
                  slotProps={{ htmlInput: { maxLength: 199 } }}
                  error={errors?.school_name}
                  helperText={errorMessages?.school_name}
                  id="school_name"
                  type="text"
                  name="school_name"
                  placeholder="school name"
                  required
                  fullWidth
                  label="School Name"
                  variant="standard"
                  color={errors.school_name ? "error" : "primary"}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth={true}>
                <TextField
                  value={values?.school_address ?? ""}
                  onChange={(e) => validateNset(e)}
                  slotProps={{ htmlInput: { maxLength: 250 } }}
                  error={errors?.school_address}
                  helperText={errorMessages?.school_address}
                  id="school_address"
                  type="text"
                  name="school_address"
                  placeholder="street address"
                  required
                  fullWidth
                  label="School Address"
                  variant="standard"
                  color={errors.school_address ? "error" : "primary"}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth={true}>
                <TextField
                  value={values?.school_city ?? ""}
                  onChange={(e) => validateNset(e)}
                  error={errors?.school_city}
                  helperText={errorMessages?.school_city}
                  slotProps={{ htmlInput: { maxLength: 150 } }}
                  id="school_city"
                  type="text"
                  name="school_city"
                  placeholder="city/district name"
                  required
                  fullWidth
                  label="City"
                  variant="standard"
                  color={errors.school_city ? "error" : "primary"}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth={true}>
                <TextField
                  value={values?.school_state ?? ""}
                  onChange={(e) => validateNset(e)}
                  error={errors?.school_state}
                  helperText={errorMessages?.school_state}
                  slotProps={{ htmlInput: { maxLength: 150 } }}
                  id="school_state"
                  type="text"
                  name="school_state"
                  placeholder="state/ut name"
                  required
                  fullWidth
                  label="State/Union Territory"
                  variant="standard"
                  color={errors.school_state ? "error" : "primary"}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <FormControl>
                <TextField
                  value={values?.postal_code ?? ""}
                  onChange={(e) => setValues({ ...values, postal_code: e.target.value })}
                  slotProps={{ htmlInput: { maxLength: 20 } }}
                  id="postal_code"
                  type="text"
                  name="postal_code"
                  placeholder="postal/pin/zip code"
                  autoComplete="none"
                  fullWidth
                  label="Postal Code"
                  variant="standard"
                />
              </FormControl>
            </Grid2>
            <Divider style={{ width: "100%" }} />
            <Grid2 size={12}>
              <Typography variant="body2">
                By clicking “Sign up”, you agree to our{" "}
                <Link href="#" underline="hover">
                  terms of service
                </Link>{" "}
                acknowledge you have read our{" "}
                <Link href="#" underline="hover">
                  privacy policy
                </Link>{" "}
                .
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Button type="submit" color="success" disabled={Object.keys(errors).length == 0 ? false : true} variant="contained" onClick={validateInputs}>
                Sign Up
              </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 9 }}>
              <Typography textAlign={"end"} variant="subtitle2">
                Already have account? Please <Chip color="primary" label="Sign In" component="a" href="/" variant="outlined" clickable />.
              </Typography>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Container>
  );
}
