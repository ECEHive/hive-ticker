import { useLocalStorage } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
const TimeContext = createContext();
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

function TimeProvider({ children }) {
    const [timeRaw, setTimeRaw] = useState(dayjs().subtract(1, "minute"));
    const [time, setTime] = useState(["12:00", "AM"]);
    const [date, setDate] = useState("Sun Sep 29");

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

    return <TimeContext.Provider value={{ time, date, openState, hours, setHours }}>{children}</TimeContext.Provider>;
}

TimeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { TimeContext, TimeProvider };
