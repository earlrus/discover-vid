import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/login.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { magic } from "../lib/magic";

const login = () => {
  const [msg, setMsg] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
    return () => {};
  }, [router]);

  const loginHandler = async () => {
    console.log(inputVal);
    if (!inputVal) {
      setMsg("Enter the email");
    } else {
      if (inputVal) {
        setMsg("");
        try {
          setIsLoading(true);
          const didToken = await magic.auth.loginWithMagicLink({
            email: inputVal,
          });
          console.log({ didToken });

          router.push("/");
          setIsLoading(false);
        } catch (error) {
          console.error("Something went wrong", error);
          setIsLoading(false);
        }
      }
    }
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setInputVal(e.target.value);
    setMsg("");
  };

  return (
    <div>
      <Head>
        <title>Login Page</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <Image
            src={"/static/Netflix-Logo.svg"}
            alt="logo"
            width={200}
            height={200}
          />
        </header>
        <div className={styles.main}>
          <div className={styles.mainWrapper}>
            <h1 className={styles.login}>Sign In</h1>
            <input
              className={styles.loginInput}
              type="text"
              placeholder="Enter email address"
              onChange={changeHandler}
              value={inputVal}
            />
            <p>{msg}</p>
            <button onClick={loginHandler} className={styles.btnLogin}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
