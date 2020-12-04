import React, { useEffect, useState } from "react";
import "./Reels.css";
import VideoCard from "./VideoCard";
import { db } from "./firebase";

function Reels() {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    db.collection("reels").onSnapshot((snapshot) => {
      setReels(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="reels">
      <div className="reels_top">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png"
          className="reels_logo"
          alt="Logo"
        />
        <h1>Reels</h1>
      </div>

      <div className="reels_videos">
        {reels.map(({ channel, avatarSrc, song, url, likes, shares }) => (
          <VideoCard
            channel={channel}
            avatarSrc={avatarSrc}
            song={song}
            url={url}
            likes={likes}
            shares={shares}
          />
        ))}
      </div>
    </div>
  );
}

export default Reels;
