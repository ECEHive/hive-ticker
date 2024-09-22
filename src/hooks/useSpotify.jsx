import { useContext } from "react";
import { SpotifyContext } from "../contexts/SpotifyContext";

export default function useSpotify() {
    return useContext(SpotifyContext);
}
