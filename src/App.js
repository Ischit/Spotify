import { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ playlistid, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        console.log("playlists is ", playlists);
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
      if (playlistid) {
        spotify.getPlaylist(playlistid).then((response) => {
          dispatch({
            type: "SET_DISCOVER_WEEKLY",
            discover_weekly: response,
          });
        });
      }

      spotify.getMyTopArtists().then((response) => {
        console.log(response);
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        });
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
    }
  }, [token, dispatch, playlistid]);

  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
