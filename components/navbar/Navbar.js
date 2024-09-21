import Link from "next/link";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { magic } from "../../lib/magic";

function Navbar() {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");

  const setUser = async () => {
    try {
      const { email } = await magic.user.getMetadata();
      setUsername(email);
    } catch (error) {
      console.error("something went wrong", error);
    }
  };

  useEffect(() => {
    // async function checkUser() {
    //   try {
    //     const isLoggedIn = await magic.user.isLoggedIn();
    //     if (isLoggedIn) {
    //       router.push("/login");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // checkUser();
    setUser();
    return () => {};
  }, []);

  function changeDropDownHandler(e) {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  }

  function homeHandler(e) {
    e.preventDefault();
    router.push("/");
  }

  function listHandler(e) {
    e.preventDefault();
    router.push("/browse/list");
  }

  async function signoutHandler() {
    try {
      await magic.user.logout();
      const isLoggedIn = await magic.user.isLoggedIn();
      console.log({ isLoggedIn });

      if (!isLoggedIn) {
        router.push("/login");
      }
    } catch (error) {
      console.log("error signout", error);
    }
  }
  return (
    <div className={styles.container}>
      <Image
        src={"/static/Netflix-Logo.svg"}
        alt="netflix logo"
        width={148}
        height={50}
      />
      <div className={styles.navWrapper}>
        <ul className={styles.listItems}>
          <li onClick={homeHandler}>Home</li>
          <li onClick={listHandler}>List</li>
        </ul>
      </div>
      <nav className={styles.userWrapper}>
        <div className={styles.dropDownWrapper}>
          <button
            onClick={changeDropDownHandler}
            className={styles.usernamebtn}
          >
            {username}
          </button>
          <Image
            src={"/static/dropdown.svg"}
            alt="dropdown"
            width={32}
            height={32}
          />
        </div>
        {showDropDown && (
          <Link href={"/login"} onClick={signoutHandler}>
            signout
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
