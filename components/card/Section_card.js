import React from "react";
import Card from "./Card";
import styles from "./section_card.module.css";
import Link from "next/link";

function Section_card(props) {
  const { title, videos: disneyVideos = [], size } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {disneyVideos.map((video, idx) => (
          <Link href={`video/${video.id || idx}`} key={idx}>
            <Card imgUrl={video.imgUrl} size={size} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Section_card;
