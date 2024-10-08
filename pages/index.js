import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner/Banner";
import Navbar from "@/components/navbar/Navbar";
import Card from "../components/card/Card";
import Section_card from "@/components/card/Section_card";
import { getVideos } from "@/lib/videos";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailers");
  const travel = await getVideos("travel");
  const productivity = await getVideos("productivity");
  const popular = await getVideos("popular");

  return {
    props: {
      disneyVideos,
      travel,
      productivity,
      popular,
    },
  };
}

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Navbar />
        <div className={styles.main}>
          <Banner
            videoId="aman"
            title="clifford the red dog"
            subtitle="a ve6ry cute dog"
            imgUrl="static/clifford.webp"
          />
        </div>
        <div className={styles.sectionWrapper}>
          <Section_card
            title="Disney"
            size="large"
            videos={props.disneyVideos}
          />
        </div>

        <div className={styles.sectionWrapper}>
          <Section_card title="Travel" size="small" videos={props.travel} />
        </div>

        <div className={styles.sectionWrapper}>
          <Section_card
            title="Productivity"
            size="medium"
            videos={props.productivity}
          />
        </div>

        <div className={styles.sectionWrapper}>
          <Section_card
            title="Most Popular"
            size="small"
            videos={props.popular}
          />
        </div>
      </div>
    </>
  );
}
