import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import LoginModal from "@/modals/LoginModalnext-13";
import { RegisterModal } from "@/modals/RegisterModalnext-13";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import EditModal from "@/modals/EditModalnext-13";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <LoginModal />
      <RegisterModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
