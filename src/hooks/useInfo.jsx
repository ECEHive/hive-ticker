import { useContext } from "react";
import { InfoContext } from "../contexts/InfoContext";

export default function useInfo() {
    return useContext(InfoContext);
}
