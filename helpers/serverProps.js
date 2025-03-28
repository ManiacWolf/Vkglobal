import { Logout } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { getCookies } from "cookies-next";
import { getCookies as getAllCookies, deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { push } = useRouter();
  return (
    <IconButton
      size="large"
      sx={{ marginLeft: "auto" }}
      color="error"
      onClick={() => {
        const cookies = getAllCookies();
        Object.keys(cookies).forEach((c) => {
          deleteCookie(c);
        });
        push("/");
      }}
      variant="outlined"
    >
      <Logout />
    </IconButton>
  );
};
const getUserServerSideProps = async ({ req, res }) => {
  const baseCookie = await getCookies({ req, res });
  if (baseCookie && Object.keys(baseCookie).length == 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  if ((baseCookie && !baseCookie.is_verified) || !baseCookie.is_active) {
    return {
      redirect: {
        permanent: false,
        destination: "/wait",
      },
    };
  }

  return { props: { cookies: baseCookie } };
};

const getAdminServerSideProps = async ({ req, res }) => {
  const baseCookie = await getCookies({ req, res });
  if (baseCookie && Object.keys(baseCookie).length == 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  if ((baseCookie && !baseCookie.is_verified) || !baseCookie.is_active) {
    return {
      redirect: {
        permanent: false,
        destination: "/wait",
      },
    };
  }
  /* if (parseInt(baseCookie.role) < 5) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  } */

  return { props: { cookies: baseCookie } };
};

export { getAdminServerSideProps, getUserServerSideProps, LogoutButton };
