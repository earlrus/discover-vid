import React from "react";
import styles from "./banner.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const Banner = (props) => {
  const { title, subtitle, imgUrl, videoId } = props;
  const router = useRouter();

  const playButtonHandler = () => {
    console.log("i play");
    router.push(`video/${videoId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.nfWrapper}>
          <span className={styles.nf}>N</span>
          <span className={styles.nfseries}>S E R I E S</span>
        </div>
        <div className={styles.left}>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subtitle}>{subtitle}</h3>
          <div className={styles.btnWrapper}>
            <button className={styles.btnWithIcon} onClick={playButtonHandler}>
              <Image
                src={"/play_arrow.svg"}
                alt="play icon"
                width={20}
                height={20}
              />
              <span>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default Banner;
