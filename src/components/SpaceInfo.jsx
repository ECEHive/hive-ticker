import { Box, Flex, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import useTheme from "../hooks/useTheme";
import useTime from "../hooks/useTime";

const digitMap = [
    (time) => (time[0] !== "0" ? time[0] : ""),
    (time) => time[1],
    () => ":",
    (time) => time[3],
    (time) => time[4],
];

export default function SpaceInfo({}) {
    const { time, openState, date } = useTime();
    const { colorTheme } = useTheme();

    const dateLines = useMemo(() => {
        return date.split(" ");
    }, [date]);

    const timeHelper = useMemo(() => {
        if (!openState?.openToday) return ["Closed", "Today", "", ""];

        const openTime = dayjs()
            .set("hour", openState.hours[0].split(":")[0])
            .set("minute", openState.hours[0].split(":")[1]);
        const closeTime = dayjs()
            .set("hour", openState.hours[1].split(":")[0])
            .set("minute", openState.hours[1].split(":")[1]);

        const timeUntilClose = dayjs.duration(closeTime.diff(dayjs(), "milliseconds"));
        const timeUntilOpen = dayjs.duration(openTime.diff(dayjs(), "milliseconds"));

        console.log(openState);

        if (timeUntilOpen.asMinutes() < 60 && timeUntilOpen.asMinutes() > 0) {
            return ["Opening", `at ${openTime.format("ha")}`, openTime, closeTime];
        } else if (timeUntilClose.asMinutes() < 60 && timeUntilClose.asMinutes() > 0) {
            return ["hours", "Closing soon", openTime, closeTime];
        } else if (!openState.openNow) {
            if (dayjs().hour() >= closeTime.hour() && dayjs().minute() >= closeTime.minute()) {
                return ["Closed", "After hours", openTime, closeTime];
            } else {
                return ["Closed", "Before hours", openTime, closeTime];
            }
        } else {
            return ["hours", "Today's hours", openTime, closeTime];
        }
    }, [openState]);

    return (
        <Box
            width="auto"
            height="100%"
            minHeight="100%"
            maxWidth="650px"
            maxHeight="100%"

            // className="overflow-hidden border-r-2 border-[--sand-6]"
        >
            <Flex direction="column" justify="center" align="center" gap="8" height="100%" width="100%">
                {/* clock */}
                <Flex
                    direction="column"
                    justify="start"
                    align="start"
                    gap="1"
                    height="auto"
                    width="100%"
                    flexGrow="1"
                    p="7"
                    pb="0"
                >
                    <Flex direction="row" align="start" justify="center" gap="0" height="auto" width="auto">
                        {digitMap.map((digit, index) => {
                            return (
                                <AnimatePresence mode="popLayout" key={index}>
                                    <motion.div
                                        key={digit(time[0])}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                    >
                                        {digit(time[0]) !== ":" ? (
                                            <p className="font-mono text-[9.8rem] font-semibold leading-none">
                                                {digit(time[0])}
                                            </p>
                                        ) : (
                                            <p className="font-sans text-[9.8rem] font-medium leading-none">
                                                {digit(time[0])}
                                            </p>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            );
                        })}
                        <Text className="mb-4 self-end font-mono text-5xl font-medium">{time[1]}</Text>
                    </Flex>

                    <Flex direction="column" align="start" justify="start" gap="0" height="auto" width="100%">
                        {dateLines.map((line, index) => {
                            return (
                                <Text key={index} className="text-6xl font-medium text-[--gray-11]">
                                    {line}
                                </Text>
                            );
                        })}
                    </Flex>
                </Flex>

                {/* <Flex dir="row" align="center" justify="start" gap="4" height="auto" width="100%">
                    <Separator orientation="horizontal" size="3" className="w-1/2 bg-[--gray-10]" />
                    <img
                        src={logo}
                        // width="100%"
                        // height="100%"
                        style={{
                            width: "auto",
                            height: "50px",
                            filter: colorTheme === "light" && "invert(1)",
                            // filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2))",
                        }}
                    /> 
                </Flex> */}

                <Flex
                    direction="column"
                    align="start"
                    justify="end"
                    gap="0"
                    height="auto"
                    width="100%"
                    className="border-t-[3px] border-[--sand-6]"
                    p="7"
                >
                    {/* <Text className="text-4xl font-medium text-[--gray-11]">9/29/2024</Text> */}

                    {/* hours */}
                    {timeHelper && (
                        <Flex direction="column" align="start" justify="center" gap="2" height="auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    key={timeHelper[1]}
                                >
                                    <p className="text-5xl font-medium text-[--gray-11]">{timeHelper[1]}</p>
                                </motion.div>
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    key={timeHelper[0]}
                                >
                                    <p
                                        className={`${timeHelper[0] !== "Closing" && openState.openNow ? "font-mono" : "font-sans"} text-7xl font-semibold`}
                                    >
                                        {timeHelper[0] === "hours"
                                            ? `${timeHelper[2].format("h:mma")}- ${timeHelper[3].format("h:mma")}`
                                            : timeHelper[0]}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
}
