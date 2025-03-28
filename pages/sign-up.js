import Head from "next/head";
import SignUpCard from "@/components/SignIn/SignUpCard";
export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up | Smart Minds</title>
        <meta name="description" content="A web app to generate question papers for the students of Smart Minds Mathematics." />
      </Head>

      <SignUpCard />
    </>
  );
}
