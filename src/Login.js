import React from "react";
import "./Login.css";
import { loginUrl } from "./spotify";

function Login() {
  return (
    <div className="login">
      <img
        src="https://static.vecteezy.com/system/resources/previews/006/642/202/large_2x/spotify-icon-spotify-logo-spotify-symbol-logo-set-free-vector.jpg"
        alt="Spotify logo"
      />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;
