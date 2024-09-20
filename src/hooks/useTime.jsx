import { useContext } from "react";
import { TimeContext } from "../contexts/TimeContext";

export default function useTime() {
    const context = useContext(TimeContext);

    return context;
}
