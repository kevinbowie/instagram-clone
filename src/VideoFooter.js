import React from "react";
import { Button, Avatar } from "@material-ui/core";
import "./VideoFooter.css";
import Ticker from "react-ticker";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import SendIcon from "@material-ui/icons/Send";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function VideoFooter({ channel, likes, shares, avatarSrc, song }) {
  return (
    <div className="video-footer">
      <div className="video-footer_text">
        <Avatar src={avatarSrc} />
        <h3>
          {channel} . <Button>Follow</Button>
        </h3>
      </div>
      <div className="video-footer_ticker">
        <MusicNoteIcon className="video-footer_icon" />
        <Ticker mode="smooth">
          {({ index }) => (
            <>
              <h1>{song}</h1>
            </>
          )}
        </Ticker>
      </div>
      <div className="video-footer_actions">
        <div className="video-footer_actions_left">
          <FavoriteIcon />
          <ModeCommentIcon />
          <SendIcon />
          <MoreHorizIcon />
        </div>
        <div className="video-footer_actions_right">
          <div className="video-footer_stat">
            <FavoriteIcon />
            <p>{likes}</p>
          </div>
          <div className="video-footer_stat">
            <ModeCommentIcon />
            <p>{shares}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
