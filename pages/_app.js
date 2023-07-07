import useAuthStore from "@/stores/auth";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";
import { Toaster } from "react-hot-toast";
import Cookie from "js-cookie";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { user, authenticated, getUserInfo } = useAuthStore();

  useLayoutEffect(() => {
    const token = Cookie.get("token");
    if (authenticated && router.pathname === "/login") {
      router.push("/");
    }
    if (token && !authenticated) {
      getUserInfo();
    }
    if (
      !authenticated &&
      router.pathname !== "/login" &&
      router.pathname !== "/register"
    ) {
      router.push("/login");
    }
  }, [authenticated]);
  return (
    <>
      <Toaster />
      <Component {...pageProps} />;
    </>
  );
}
