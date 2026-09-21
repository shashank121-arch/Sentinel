"use client";

import { useEffect, useRef } from "react";

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4";
const POSTER_URL = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp";

export function BackgroundEngine() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoA.removeAttribute("autoplay");
      videoA.pause();
      videoB.pause();
      try {
        videoA.currentTime = 0;
      } catch (e) {}
      return;
    }

    const FADE = 0.9;
    let cur = videoA;
    let nxt = videoB;
    let swapping = false;
    let timeoutId: NodeJS.Timeout;

    const playVideo = (v: HTMLVideoElement) => {
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    };

    playVideo(videoA);

    const tick = () => {
      if (swapping || !cur.duration) return;
      if (cur.duration - cur.currentTime > FADE) return;

      swapping = true;
      const out = cur;
      nxt.currentTime = 0;
      playVideo(nxt);
      nxt.classList.add("is-active");
      out.classList.remove("is-active");

      // Swap pointers
      const temp = cur;
      cur = nxt;
      nxt = temp;

      timeoutId = setTimeout(() => {
        out.pause();
        out.currentTime = 0;
        swapping = false;
      }, FADE * 1000 + 100);
    };

    videoA.addEventListener("timeupdate", tick);
    videoB.addEventListener("timeupdate", tick);

    return () => {
      videoA.removeEventListener("timeupdate", tick);
      videoB.removeEventListener("timeupdate", tick);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className="bg"
      role="img"
      aria-label="Stylised globe of Earth rendered as a purple dot matrix against a starfield, slowly rotating"
    >
      <video
        ref={videoARef}
        className="bg-video is-active"
        id="bgVideoA"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        poster={POSTER_URL}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <video
        ref={videoBRef}
        className="bg-video"
        id="bgVideoB"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        poster={POSTER_URL}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
    </div>
  );
}
