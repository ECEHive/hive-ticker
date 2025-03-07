import { ClockIcon, ExitIcon, IdCardIcon, SunIcon, TrashIcon } from "@radix-ui/react-icons";
import { useLocalStorage } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useRef, useState } from "react";

// audio imports
import chime2Sound from "../assets/audio/chime_2.mp3";
import chime3Sound from "../assets/audio/chime_3.mp3";

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
    const recentAlertId = useRef("");
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

    const openState = useMemo(() => {
        const day = dayjs().format("dddd").toLowerCase();
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

    // ALERT STUFF
    const alertTemplates = useMemo(
        () => ({
            hourly: (time) => {
                return {
                    title: `The time is ${time.format("hA")}`,
                    icon: ClockIcon,
                    bullets: [
                        {
                            icon: TrashIcon,
                            text: "Help keep the space clean!",
                        },
                        // {
                        //     icon: PersonIcon,
                        //     text: "This is a community run space, be respectful of it",
                        // },
                    ],
                };
            },
            opened: (timeRaw) => {
                return {
                    title: `The Hive is now open`,
                    icon: SunIcon,
                    text: "Good morning and welcome to the Hive!",
                };
            },
            closingSoon: (timeRaw) => {
                return {
                    title: `The Hive is closing soon`,
                    icon: ClockIcon,
                    bullets: [
                        {
                            icon: TrashIcon,
                            text: "Start cleaning your work area",
                        },
                        {
                            icon: IdCardIcon,
                            text: "Remember to sign out of SUMS when leaving",
                        },
                    ],
                };
            },
            openingSoon: (timeRaw) => {
                return {
                    title: `The Hive is opening soon`,
                    icon: SunIcon,
                    bullets: [
                        {
                            icon: IdCardIcon,
                            text: "Remember to sign in for your shift",
                        },
                    ],
                };
            },
            closed: (timeRaw) => {
                return {
                    title: `The Hive is now closed`,
                    icon: ExitIcon,
                    bullets: [
                        {
                            icon: TrashIcon,
                            text: "Clean your work area",
                        },
                        {
                            icon: IdCardIcon,
                            text: "Sign out of SUMS when leaving",
                        },
                    ],
                };
            },
        }),
        [],
    );

    const alertSchedule = useMemo(() => {
        const openTime = dayjs()
            .set("hour", openState.hours[0].split(":")[0])
            .set("minute", openState.hours[0].split(":")[1]);

        const closeTime = dayjs()
            .set("hour", openState.hours[1].split(":")[0])
            .set("minute", openState.hours[1].split(":")[1]);

        if (openState.openToday) {
            const data = [
                {
                    start: closeTime.subtract(15, "minute"),
                    end: closeTime,
                    type: "closingSoon",
                    chime: chime3Sound,
                    id: "closingSoon",
                },
                {
                    start: closeTime,
                    end: closeTime.add(10, "minute"),
                    type: "closed",
                    chime: chime3Sound,
                    id: "closed",
                },
                {
                    start: openTime.subtract(5, "minute"),
                    end: openTime,
                    type: "openingSoon",
                    chime: chime3Sound,
                    id: "openingSoon",
                },
                {
                    start: openTime,
                    end: openTime.add(10, "minute"),
                    type: "opened",
                    chime: chime3Sound,
                    id: "opened",
                },
            ];
            return data;
        }
    }, [openState]);

    useEffect(() => {
        // hourly alerts
        let currentAlert = alertSchedule.find((alert) => {
            return timeRaw.isBetween(alert.start, alert.end, "minute", "[)");
        });
        if (timeRaw.minute() === 0 && openState.openNow) {
            // hourly alert
            currentAlert = {
                start: timeRaw,
                end: timeRaw.add(1, "minute"),
                type: "hourly",
                chime: chime2Sound,
                id: `${timeRaw.format("hh:mm")}`,
            };
        }

        // play alert
        if (currentAlert && currentAlert.id !== recentAlertId.current) {
            setAlertContent(alertTemplates[currentAlert.type](timeRaw));

            if (!alertBlock.current || recentAlertId.current !== currentAlert.id) {
                recentAlertId.current = currentAlert.id;
                console.log("alerting");
                // make announcement
                alertBlock.current = true;
                setAlertActive(true);

                // play chime sound and wait for it to finish before continuing
                const audio = new Audio(currentAlert.chime);
                audio.play();
                audio.onended = () => {
                    // play stevie audio
                };
            }
        } else if (alertBlock.current && !currentAlert) {
            console.log("alert done");
            setAlertContent(null);
            setAlertActive(false);
            alertBlock.current = false;
        }
    }, [timeRaw, openState, alertSchedule, alertTemplates]);

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
