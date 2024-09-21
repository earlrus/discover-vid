import Image from "next/image";
import React from "react";
import styles from "./card.module.css";
import { motion } from "framer-motion";
import cls from "classnames";

function Card(props) {
  const { imgUrl, size = "medium" } = props;
  const [imgSrc, setImgSrc] = React.useState(imgUrl);
  const mapTable = {
    small: styles.smallImg,
    medium: styles.mdImg,
    large: styles.largeImg,
  };
  return (
    <div className={styles.conatiner}>
      <motion.div
        className={cls(styles.motionWrapper, mapTable[size])}
        whileHover={{ scaleY: 1.1 }}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt="dog"
          fill
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            )
          }
        />
      </motion.div>
    </div>
  );
}

export default Card;
