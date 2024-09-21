import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { magic } from "../lib/magic";
import { useRouter } from "next/router";
import Loader from "@/components/loader/Loader";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function checkHandler() {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      console.log(isLoggedIn);

      if (!isLoggedIn) {
        router.push("/login");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkHandler();
  }, []);

  useEffect(() => {
    const handleCompleted = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleCompleted);
    router.events.on("routeChangeError", handleCompleted);

    return () => {
      router.events.off("routeChangeComplete", handleCompleted);
      router.events.off("routeChangeError", handleCompleted);
    };
  }, [router]);

  return isLoading ? <Loader /> : <Component {...pageProps} />;
}
