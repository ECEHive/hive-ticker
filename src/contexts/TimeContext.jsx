import { useLocalStorage } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useRef, useState } from "react";

// audio imports
import chimeSound from "../assets/audio/chime.mp3";
import closedSound from "../assets/audio/closed.mp3";

const TimeContext = createContext();
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

function TimeProvider({ children }) {
    const [timeRaw, setTimeRaw] = useState(dayjs().subtract(1, "minute"));
    const [time, setTime] = useState(["12:00", "AM"]);
    const [date, setDate] = useState("Sun Sep 29");

    const alertBlock = useRef(false);
    const [alertActive, setAlertActive] = useState(false);
    const [alertContent, setAlertContent] = useState(null);

    const [hours, setHours] = useLocalStorage("open-hours", {
        monday: {
            open: true,
            hours: ["10:00", "18:00"],
        },
        tuesday: {
            open: true,
            hours: ["10:00", "18:00"],
        },
        wednesday: {
            open: true,
            hours: ["10:00", "18:00"],
        },
        thursday: {
            open: true,
            hours: ["10:00", "18:00"],
        },
        friday: {
            open: true,
            hours: ["10:00", "18:00"],
        },
        saturday: {
            open: false,
            hours: ["", ""],
        },
        sunday: {
            open: false,
            hours: ["", ""],
        },
    });

    // const [alertSchedule, setAlertSchedule] = useLocalStorage("alert-schedule", {
    //     "10:05": {
    //         type: "open-reminder",
    //     },
    //     "23:39": {
    //         type: "open",
    //     },
    // });

    const alertSchedule = useMemo(() => {
        return {
            "00:47": {
                type: "closed",
            },
            "00:48": {
                type: "closed",
            },
        };
    }, []);

    const openState = useMemo(() => {
        const time = dayjs();
        const day = time.format("dddd").toLowerCase();

        const todayHours = hours[day];

        if (todayHours.open) {
            const openTime = dayjs()
                .set("hour", todayHours.hours[0].split(":")[0])
                .set("minute", todayHours.hours[0].split(":")[1]);
            const closeTime = dayjs()
                .set("hour", todayHours.hours[1].split(":")[0])
                .set("minute", todayHours.hours[1].split(":")[1]);

            if (dayjs().isBetween(openTime, closeTime, null, "[)")) {
                return {
                    openNow: true,
                    openToday: true,
                    hours: todayHours.hours,
                };
            } else {
                return {
                    openNow: false,
                    openToday: true,
                    hours: todayHours.hours,
                };
            }
        } else {
            return {
                openNow: false,
                openToday: false,
            };
        }
    }, [hours]);

    useEffect(() => {
        const secondInterval = setInterval(() => {
            if (timeRaw.format("m") === dayjs().format("m")) return;
            setTime([dayjs().format("hh:mm"), dayjs().format("A")]);
            setDate(dayjs().format("dddd MMMM D"));
            setTimeRaw(dayjs());
        }, 1000);

        return () => {
            clearInterval(secondInterval);
        };
    }, [timeRaw]);

    useEffect(() => {
        if (alertBlock.current) return;
        if (timeRaw.minute === 0 && openState.openNow) {
            // hourly announcement
        }
        if (alertSchedule[timeRaw.format("HH:mm")]) {
            console.log("alerting");
            // make announcement
            alertBlock.current = true;
            setAlertActive(true);
            setAlertContent(alertSchedule[timeRaw.format("HH:mm")].type);

            // play chime sound and wait for it to finish before continuing
            const audio = new Audio(chimeSound);
            audio.play();
            audio.onended = () => {
                // play closed sound
                const audio = new Audio(closedSound);
                audio.play();

                // wait for audio to finish playing
                audio.onended = () => {
                    console.log("alert done");
                    setTimeout(() => {
                        setAlertContent(null);
                        setAlertActive(false);
                    }, 10000);
                    setTimeout(() => {
                        alertBlock.current = false;
                    }, 60000);
                };
            };
        }
    }, [timeRaw, openState, alertSchedule]);

    return (
        <TimeContext.Provider value={{ time, date, openState, hours, setHours, alertActive, alertContent }}>
            {children}
        </TimeContext.Provider>
    );
}

TimeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { TimeContext, TimeProvider };
