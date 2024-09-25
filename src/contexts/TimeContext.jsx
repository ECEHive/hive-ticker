import { useLocalStorage } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
const TimeContext = createContext();
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(relativeTime);

function TimeProvider({ children }) {
    const [timeRaw, setTimeRaw] = useState(dayjs().subtract(1, "minute"));
    const [time, setTime] = useState(["12:00", "AM"]);
    const [date, setDate] = useState("January 1, 1970");

    const [hours, setHours] = useLocalStorage("opening-hours", {
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
            hours: [],
        },
        sunday: {
            open: false,
            hours: [],
        },
    });

    const openState = useMemo(() => {
        const time = dayjs();
        const day = time.format("dddd").toLowerCase();
        const timeHours = time.hour();
        const timeMinutes = time.minute();

        const todayHours = hours[day];
        const todayOpenHours = todayHours.hours[0].split(":")[0];
        const todayOpenMinutes = todayHours.hours[0].split(":")[1];
        const todayCloseHours = todayHours.hours[1].split(":")[0];
        const todayCloseMinutes = todayHours.hours[1].split(":")[1];

        if (todayHours.open) {
            if (
                timeHours >= todayOpenHours &&
                timeHours <= todayCloseHours &&
                timeMinutes >= todayOpenMinutes &&
                timeMinutes <= todayCloseMinutes
            ) {
                if (
                    timeHours === todayCloseHours &&
                    timeMinutes >= todayCloseMinutes
                ) {
                    return {
                        openNow: true,
                        openToday: true,
                        hours: todayHours.hours,
                    };
                } else {
                    return {
                        openNow: true,
                        openToday: true,
                        hours: todayHours.hours,
                    };
                }
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
            console.log("tick");
            setTime([dayjs().format("hh:mm"), dayjs().format("A")]);
            setDate(dayjs().format("MMMM D, YYYY"));
            setTimeRaw(dayjs());
        }, 1000);

        return () => {
            clearInterval(secondInterval);
        };
    }, [timeRaw]);

    return (
        <TimeContext.Provider value={{ time, date, openState }}>
            {children}
        </TimeContext.Provider>
    );
}

TimeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { TimeContext, TimeProvider };
