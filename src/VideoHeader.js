import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import "./VideoHeader.css";

function VideoHeader() {
  return (
    <div className="video-header">
      <ArrowBackIosIcon />
      <h3>Reels</h3>
      <CameraAltOutlinedIcon />
    </div>
  );
}

export default VideoHeader;
