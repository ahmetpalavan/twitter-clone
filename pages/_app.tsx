import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import LoginModal from "@/modals/LoginModalnext-13";
import { RegisterModal } from "@/modals/RegisterModalnext-13";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
