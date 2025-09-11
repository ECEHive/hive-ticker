import { Flex, Grid } from "@radix-ui/themes";
import dayjs from "dayjs";
import { motion } from "motion/react";
import { useEffect } from "react";
import useAirtable from "../../hooks/useAirtable";
import SpecialSlideTemplate from "./Template";

export default function Workshops({}) {
    const workshopCalendar = useAirtable("workshops", 120000, (data) => {
        return data.sort((a, b) => new Date(a["Event Date"]) - new Date(b["Event Date"]));
    });

    useEffect(() => {
        console.log("workshopCalendar", workshopCalendar);
    }, [workshopCalendar]);

    return (
        <SpecialSlideTemplate title="Upcoming Events & Workshops">
            <Grid width="100%" gap="4" height="100%" columns="5" rows="auto">
                {workshopCalendar.length > 0 &&
                    [...Array(21).keys()].map((dateOffset) => {
                        const day = dayjs()
                            .startOf("week")
                            .add(dateOffset + 1, "day")
                            .startOf("day");

                        // if it's a weekend skip
                        if (day.day() === 0 || day.day() === 6) return null;

                        const events =
                            workshopCalendar?.filter((event) => day.isSame(dayjs(event["Event Date"]), "day")) || [];
                        const passed = day.isBefore(dayjs(), "day");

                        return (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: passed ? 0.5 : 1 }}
                                transition={{ delay: dateOffset * 0.01 }}
                                key={dateOffset}
                                className={`flex flex-col items-start justify-start gap-2 ${day.isSame(dayjs(), "day") && "border-4 border-amber-100"} bg-zinc-800 p-5`}
                            >
                                <p className="text-xl font-medium text-[--gray-11]">{day.format("ddd, MMM D")}</p>

                                {events.length > 0 ? (
                                    <>
                                        {events.map((event, index) => {
                                            const seatsOpen = event["Capacity"] - event["Attendees Registered"];

                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className={`flex flex-col gap-2`}
                                                >
                                                    <Flex direction="column" gap="1">
                                                        <p className="text-4xl font-semibold">{event["Name"]}</p>
                                                        <p className="text-2xl font-medium">
                                                            {dayjs(event["Event Date"]).format("h:mm A")}
                                                        </p>
                                                    </Flex>

                                                    <Flex direction="column" gap="1">
                                                        {seatsOpen !== 0 ? (
                                                            <span className="inline-flex text-3xl">
                                                                <p className="font-mono font-medium">{seatsOpen}</p>
                                                                <p className="text-[--gray-11]">&nbsp;open seats</p>
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex text-3xl">
                                                                <p className="font-mono font-medium">
                                                                    {event["Waitlist Length"]}
                                                                </p>
                                                                <p className="text-[--gray-11]">&nbsp;on waitlist</p>
                                                            </span>
                                                        )}
                                                    </Flex>
                                                </motion.div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <Flex
                                        direction="column"
                                        justify="center"
                                        flexGrow="1"
                                        className="h-full grow self-center"
                                    >
                                        {/* <p className="text-3xl font-medium text-[--gray-8]">No events</p> */}
                                    </Flex>
                                )}
                            </motion.div>
                        );
                    })}
            </Grid>
            <Flex className="mt-6 flex flex-row items-center justify-start gap-4">
                <p className="text-3xl font-medium">
                    Event signups are sent in our weekly newsletter! Subscribe at{" "}
                    <a className="underline">newsletter.hivemakerspace.com</a>
                </p>
                {/* <img src={newsletterQR} className="h-16" /> */}
            </Flex>
        </SpecialSlideTemplate>
    );
}
