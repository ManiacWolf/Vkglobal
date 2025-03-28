import Head from "next/head";
import SignIn from "@/components/SignIn";
export default function Home() {
  return (
    <>
      <Head>
        <title>Smart Minds Question Paper Generator</title>
        <meta name="description" content="A web app to generate question papers for the students of Smart Minds Mathematics." />
      </Head>
      <SignIn />
    </>
  );
}
