import { AppBar, Box, Container, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Header(props) {
  const trigger = useScrollTrigger({ threshold: 10, disableHysteresis: true });
  return (
    <Fragment>
      <Head>
        <title>{props?.title}</title>
        <meta name="description" content={props?.description} />
      </Head>

      <AppBar position="sticky" sx={{ boxShadow: !trigger && "none" }} color={trigger ? "smartminds" : "transparent"}>
        <Toolbar disableGutters>
          <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", paddingY: 1 }}>
            <Box sx={{ height: { xs: 40, lg: 45, xl: 50 }, width: { xs: 0.784568703944517 * 40, lg: 0.784568703944517 * 45, xl: 0.784568703944517 * 50 }, position: "relative" }}>
              <Image src={"/vk-global.svg"} fill={true} quality={100} alt="VK Global Publications Limited" />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Box sx={{ width: { xs: 100, md: 95, xl: 115 }, height: { xs: 0.143356164383562 * 100, md: 0.143356164383562 * 95, xl: 0.143356164383562 * 115 }, position: "relative" }}>
                <Image src={"/smart-minds.svg"} fill={true} quality={100} alt="S.M.A.R.T. Minds" />
              </Box>
              <Typography fontSize={20} fontWeight={600} color="text.primary" display={{ xs: "none", md: "block" }}>
                MATHEMATICS
              </Typography>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
