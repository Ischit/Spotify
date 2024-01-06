import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import { Home, LibraryMusic, Search } from "@mui/icons-material";
import { useDataLayerValue } from "./DataLayer";

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://static.vecteezy.com/system/resources/previews/006/642/202/large_2x/spotify-icon-spotify-logo-spotify-symbol-logo-set-free-vector.jpg"
        alt=""
      />
      <SidebarOption option={"Home"} Icon={Home} />
      <SidebarOption option={"Search"} Icon={Search} />
      <SidebarOption option={"Your Library"} Icon={LibraryMusic} />

      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />

      {playlists?.items?.map((playlist) => (
        <SidebarOption option={playlist.name} id={playlist.id} />
      ))}
    </div>
  );
}

export default Sidebar;
