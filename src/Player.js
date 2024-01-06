import React from "react";
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";
import { useDataLayerValue } from "./DataLayer";

function Player() {
  const [{ spotify }, dispatch] = useDataLayerValue();
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body/>
      </div>
      <Footer spotify={spotify} />
    </div>
  );
}

export default Player;
