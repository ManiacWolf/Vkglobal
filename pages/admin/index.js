import Header from "@/components/Header";
import { Button, Card, Container, Link, Stack, Typography } from "@mui/material";
import { SmartMindIcon } from "@/components/SmartIcons";
import { getAdminServerSideProps as getServerSideProps, LogoutButton } from "@/helpers/serverProps";
export default function Admin(props) {
  const { cookies } = props;
  return (
    <>
      <Header title={"User Dashboard | S.M.A.R.T. Minds"} description={`A web app to generate question papers for the students of Smart Minds Mathematics.`}>
        <SmartMindIcon />
        <LogoutButton />
      </Header>
      <Container maxWidth="xl" sx={[{ bgcolor: "background.paper", borderRadius: 2, padding: { xs: 2, md: 6 }, position: "relative", height: { xs: "auto", md: "calc(100vh - 90px)" }, marginTop: 1, overflowY: "auto" }]}>
        <Card>hello</Card>
      </Container>
    </>
  );
}
export { getServerSideProps };
