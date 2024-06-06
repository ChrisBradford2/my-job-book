import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Modal from "react-modal";
import Header from "./components/Header";
import Footer from "./components/Footer";

Modal.setAppElement("#__next");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  )
}
