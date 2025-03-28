import Content from "@/components/SignIn/Content";
import SignInCard from "@/components/SignIn/SignInCard";
import { Box, Container, Grid2 } from "@mui/material";
import Image from "next/image";

export default function SignIn() {
  return (
    <Container maxWidth={"xl"} component={"header"}>
      <Box paddingY={1}>
        <Image src={"/vk-global.svg"} width={51} height={40} quality={100} alt="VK Global Publications Limited" />
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          borderRadius: 2,
          background: "rgb(229, 249, 249)",
          background: "linear-gradient(45deg, rgba(229,249,249,.8) 0%, rgba(246,254,246,.8) 100%)",
          /* backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",*/
          backgroundRepeat: "no-repeat",
          padding: { xs: 2, md: 3, xl: 4 },
          mt: { xs: 1, sm: 2, md: 4, lg: 6 },
        }}
      >
        <Grid2 container spacing={{ xs: 2, md: 3, xl: 4 }} alignItems={{ sx: "center", md: "start", lg: "center" }}>
          <Grid2 size={{ xs: 12, md: 7, lg: 8 }} order={{ xs: 2, md: 1 }}>
            <Content />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 5, lg: 4 }} order={{ xs: 1, md: 2 }}>
            <SignInCard />
          </Grid2>
        </Grid2>
      </Container>
    </Container>
  );
}
