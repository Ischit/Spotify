import React from "react";
import "./SidebarOption.css";
import { useDataLayerValue } from "./DataLayer";

function SidebarOption({ option, Icon, id }) {
  const [{ spotify }, dispatch] = useDataLayerValue();
  const setPlaylist = () => {
    if (!Icon) {
      console.log(id);
      dispatch({
        type: "ADD_TO_PLAYLIST",
        playlistid: id,
      });
      spotify.getPlaylist(id).then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        });
      });
    }
  };

  return (
    <div className="sidebarOption" onClick={() => setPlaylist(id)}>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{option}</h4> : <p>{option}</p>}
    </div>
  );
}

export default SidebarOption;
