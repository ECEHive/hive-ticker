import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
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

    const dateLines = useMemo(() => {
        return date.split(" ");
    }, [date]);

    const timeHelper = useMemo(() => {
        if (!openState?.openToday) return ["Today", "Closed"];

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
            return ["Opening", timeUntilOpen.humanize(true)];
        } else if (timeUntilClose.asMinutes() < 60 && timeUntilClose.asMinutes() > 0) {
            return ["Closing", timeUntilClose.humanize(true)];
        } else if (!openState.openNow) {
            if (dayjs().hour() >= closeTime.hour() && dayjs().minute() >= closeTime.minute()) {
                return ["Closed", "After hours"];
            } else {
                return ["Closed", "Before hours"];
            }
        } else {
            return ["Today's hours", `${openTime.format("hA")} - ${closeTime.format("hA")}`];
        }
    }, [openState]);

    return (
        <Box
            width="100%"
            height="100%"
            minHeight="100%"
            minWidth="525px"
            maxHeight="100%"
            maxWidth="100%"
            p="8"
            // className="overflow-hidden border-r-2 border-[--gray-6]"
        >
            <Flex direction="column" justify="center" align="center" gap="8" height="100%" width="100%">
                {/* clock */}
                <Flex direction="column" justify="start" align="start" gap="0" height="auto" width="100%">
                    <Flex
                        direction="row"
                        align="start"
                        justify="center"
                        gap="0"
                        height="128px"
                        width="auto"
                        overflowY="hidden"
                    >
                        {digitMap.map((digit, index) => {
                            return (
                                <Flex key={index} width="100%" height="auto" align="center" justify="center">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={digit(time[0])}
                                            initial={{ y: "-100%" }}
                                            animate={{ y: 0 }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            exit={{ y: "100%" }}
                                        >
                                            <p className="text-9xl font-bold">{digit(time[0])}</p>
                                        </motion.div>
                                    </AnimatePresence>
                                </Flex>
                            );
                        })}
                        <Flex width="auto" height="100%" align="end" justify="center">
                            <Text className="mb-4 font-sans text-5xl font-medium">{time[1]}</Text>
                        </Flex>
                    </Flex>

                    <Flex direction="column" align="start" justify="start" gap="0" height="auto" width="100%">
                        {dateLines.map((line, index) => {
                            return (
                                <Text key={index} className="text-7xl font-medium text-[--gray-11]">
                                    {line}
                                </Text>
                            );
                        })}
                    </Flex>
                </Flex>

                <Separator orientation="horizontal" size="3" className="w-1/3 self-start bg-[--gray-10]" />

                <Flex direction="column" align="start" justify="end" gap="0" height="auto" width="100%" flexGrow="1">
                    {/* <Text className="text-4xl font-medium text-[--gray-11]">9/29/2024</Text> */}

                    {/* hours */}
                    {timeHelper && (
                        <Flex direction="column" align="start" justify="center" gap="2" height="auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    key={timeHelper[0]}
                                >
                                    <p className="text-8xl font-medium">{timeHelper[0]}</p>
                                </motion.div>
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    key={timeHelper[0]}
                                >
                                    <p className="text-5xl text-[--gray-11]">{timeHelper[1]}</p>
                                </motion.div>
                            </AnimatePresence>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
}
