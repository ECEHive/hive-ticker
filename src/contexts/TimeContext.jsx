import { useLocalStorage } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
const TimeContext = createContext();
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(relativeTime);

function TimeProvider({ children }) {
    const [time, setTime] = useState(["12:00", "AM"]);
    const [date, setDate] = useState("January 1, 1970");

    const [openState, setOpenState] = useState({
        open: true,
        hours: ["10:00", "18:00"],
    });

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
            hours: ["10:00", "18:00"],
        },
        sunday: {
            open: false,
            hours: ["10:00", "18:00"],
        },
    });

    useEffect(() => {
        const secondInterval = setInterval(() => {
            setTime([dayjs().format("hh:mm"), dayjs().format("A")]);
            setDate(dayjs().format("MMMM D, YYYY"));
        }, 1000);

        return () => {
            clearInterval(secondInterval);
        };
    }, []);

    useEffect(() => {
        const minuteInterval = setInterval(() => {
            const day = dayjs().format("dddd").toLowerCase();
            const timeHours = dayjs().hour();
            const timeMinutes = dayjs().minute();
            const todayHours = hours[day];
            const todayOpenHours = todayHours.hours[0].split(":")[0];
            const todayOpenMinutes = todayHours.hours[0].split(":")[1];
            const todayCloseHours = todayHours.hours[1].split(":")[0];
            const todayCloseMinutes = todayHours.hours[1].split(":")[1];

            if (todayHours.open) {
                if (
                    timeHours >= todayOpenHours &&
                    timeHours <= todayCloseHours &&
                    timeMinutes >= todayOpenMinutes
                ) {
                    if (
                        timeHours === todayCloseHours &&
                        timeMinutes > todayCloseMinutes
                    ) {
                        setOpenState({
                            open: false,
                            hours: [],
                        });
                    } else {
                        setOpenState({
                            open: true,
                            hours: [todayHours.hours[0], todayHours.hours[1]],
                        });
                    }
                } else {
                    setOpenState({
                        open: false,
                        hours: [],
                    });
                }
            }
        }, 30000);

        return () => {
            clearInterval(minuteInterval);
        };
    }, [hours]);

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
