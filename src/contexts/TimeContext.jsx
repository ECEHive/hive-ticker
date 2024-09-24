import { useLocalStorage } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
const TimeContext = createContext();
dayjs.extend(duration);
dayjs.extend(utc);

function TimeProvider({ children }) {
    const [time, setTime] = useState(["12:00", "AM"]);
    const [date, setDate] = useState("January 1, 1970");

    const [openingTime, setOpeningTime] = useState();
    const [closingTime, setClosingTime] = useState();

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
        const interval = setInterval(() => {
            setTime([dayjs().format("hh:mm"), dayjs().format("A")]);
            setDate(dayjs().format("MMMM D, YYYY"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <TimeContext.Provider value={{ time, date }}>
            {children}
        </TimeContext.Provider>
    );
}

TimeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { TimeContext, TimeProvider };
