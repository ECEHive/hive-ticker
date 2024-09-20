import dayjs from "dayjs";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

const TimeContext = createContext();

function TimeProvider({ children }) {
    const [time, setTime] = useState(["12:00", "AM"]);
    const [date, setDate] = useState("January 1, 1970");

    useEffect(() => {
        const interval = setInterval(() => {
            setTime([dayjs().format("hh:mm"), dayjs().format("A")]);
            setDate(dayjs().format("MMMM D, YYYY"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <TimeContext.Provider value={{time, date}}>{children}</TimeContext.Provider>;
}

TimeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { TimeContext, TimeProvider };
