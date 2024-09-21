import { useRouter } from "next/router";
import React from "react";
import Modal from "react-modal";
import styles from "../../styles/video.module.css";
import { getVideoById } from "@/lib/videos";
import Navbar from "@/components/navbar/Navbar";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const videoId = context.params.videoId;
  const data = await getVideoById(videoId);

  const video = {
    publishTime: data?.snippet?.publishedAt || null,
    title: data?.snippet?.title || null,
    description: data?.snippet?.description || null,
    cast: data?.snippet?.channelTitle || "NA",
    count: data?.statistics?.viewCount || 0,
  };

  return {
    props: { video },
    revalidate: 60,
  };
}

export function getStaticPaths() {
  const listOfVideosId = ["TbiPcMCz0Ek"];

  const paths = listOfVideosId.map((videoId) => ({
    params: { videoId },
  }));
  return { paths, fallback: "blocking" };
}

const videoId = (props) => {
  const router = useRouter();

  const video = props.video;
  const { publishTime, title, description, cast, count } = video;
  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        onRequestClose={() => router.back()}
        contentLabel="watch videos"
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <iframe
          id="player"
          type="text/html"
          width="100%"
          height="390"
          className={styles.videoPlayer}
          src={`http://www.youtube.com/embed/${router.query.videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=0&autoplay=0`}
          frameborder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalCol1}>
            <h3 className={styles.publish}>{publishTime}</h3>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.desc}>{description}</p>
          </div>
          <div className={styles.modalCol2}>
            <p>
              cast: <span className={styles.myspan}>{cast}</span>
            </p>
            <p>
              count: <span className={styles.myspan}>{count}</span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default videoId;
