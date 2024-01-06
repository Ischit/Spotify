import React, { useEffect } from "react";
import "./Footer.css";
import {
  PlayCircleOutline,
  PlaylistPlay,
  Repeat,
  Shuffle,
  SkipNext,
  SkipPrevious,
  VolumeDown,
} from "@mui/icons-material";
import { Grid, Slider } from "@mui/material";
import { useDataLayerValue } from "./DataLayer";

function Footer() {
  const [{ token, item, playing, spotify }, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    try {
      if (playing) {
        spotify.pause();
        dispatch({
          type: "SET_PLAYING",
          playing: false,
        });
      } else {
        spotify.play();
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      }
    } catch {
      alert("NEED A PREMIUM ACCOUNT...");
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify
      .getMyCurrentPlayingTrack()
      .then((r) => {
        dispatch({
          type: "SET_ITEM",
          item: r.item,
        });
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      })
      .catch(alert("NEED A PREMIUM ACCOUNT..."));
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify
      .getMyCurrentPlayingTrack()
      .then((r) => {
        dispatch({
          type: "SET_ITEM",
          item: r.item,
        });
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      })
      .catch(alert("NEED A PREMIUM ACCOUNT..."));
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <Shuffle className="footer__green" />
        <SkipPrevious onClick={skipNext} className="footer__icon" />
        {playing ? (
          <PlayCircleOutline
            fontSize="large"
            className="footer__icon"
            onClick={handlePlayPause}
          />
        ) : (
          <PlayCircleOutline
            fontSize="large"
            className="footer__icon"
            onClick={handlePlayPause}
          />
        )}
        <SkipNext onClick={skipPrevious} className="footer__icon" />
        <Repeat className="footer__green" />
      </div>

      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlay />
          </Grid>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slide" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
