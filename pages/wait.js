import Header from "@/components/Header";
import { Link, Stack, Typography } from "@mui/material";
import { SmartMindIcon } from "@/components/SmartIcons";
import { getCookies } from "cookies-next";
import { HourglassEmptyRounded } from "@mui/icons-material";
import { LogoutButton } from "@/helpers/serverProps";
export default function Wait(props) {
  const { cookies } = props;

  return (
    <>
      <Header title={"Sign Up | Smart Minds"} description={`A web app to generate question papers for the students of Smart Minds Mathematics.`}>
        <SmartMindIcon />
        <LogoutButton />
      </Header>
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "center",
            position: "relative",
            paddingTop: { xs: 2, md: 0 },
            minHeight: "100vh",
          },
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={[
            {
              justifyContent: "center",
              position: "relative",
              gap: { xs: 6, sm: 12 },
              p: { md: 2 },
              mx: "auto",
            },
            (theme) => ({
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                zIndex: -1,
                inset: 0,
                backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
                backgroundRepeat: "no-repeat",
                ...theme.applyStyles("dark", {
                  backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
                }),
              },
            }),
          ]}
        >
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              maxWidth: 968,
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            <HourglassEmptyRounded sx={{ fontSize: 120 }} />
            <Typography component="h1" fontWeight={300} variant="h5" lineHeight={1.7}>
              Hello {decodeURI(cookies?.name ?? "")},
              <br />
              We have received your request, you will receive a confirmation message on your email {decodeURI(cookies?.email ?? "")} or mobile {decodeURI(cookies?.mobile ?? "")} when your account is activated. In the meantime, please contact us at{" "}
              <Link href="mailto:mail@vkpublications.com">mail@vkpublications.com</Link> if you have any questions.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
export const getServerSideProps = async ({ req, res }) => {
  const baseCookie = await getCookies({ req, res });
  if (baseCookie && Object.keys(baseCookie).length == 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  if (baseCookie && baseCookie.is_verified == true && baseCookie.is_active == true) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }

  return { props: { cookies: baseCookie } };
};
