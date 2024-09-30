import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useMemo } from "react";
import TextTransition from "react-text-transition";
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
            return ["Opening in", timeUntilOpen.humanize()];
        } else if (timeUntilClose.asMinutes() < 60 && timeUntilClose.asMinutes() > 0) {
            return ["Closing in", timeUntilClose.humanize()];
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
                    <Flex direction="row" align="start" justify="center" gap="0" height="auto" width="auto">
                        {digitMap.map((digit, index) => {
                            return (
                                <Flex key={index} width="100%" height="auto" align="center" justify="center">
                                    <TextTransition
                                        inline
                                        delay={(digitMap.length - index) * 100}
                                        key={index}
                                        style={{
                                            fontFamily: "Rubik",
                                            lineHeight: 1,
                                            fontSize: "9.25em",
                                        }}
                                        className="font-semibold"
                                    >
                                        {digit(time[0])}
                                    </TextTransition>
                                </Flex>
                            );
                        })}
                        <Flex width="auto" height="100%" align="end" justify="center">
                            <Text className="mb-4 font-sans text-5xl font-medium">{time[1]}</Text>
                        </Flex>
                    </Flex>
                    <Text className="text-5xl font-medium text-[--gray-11]">{date}</Text>
                </Flex>

                <Separator orientation="horizontal" size="3" className="self-start bg-[--gray-10]" />

                <Flex direction="column" align="start" justify="start" gap="0" height="auto" width="100%" flexGrow="1">
                    {/* <Text className="text-4xl font-medium text-[--gray-11]">9/29/2024</Text> */}

                    {/* hours */}
                    {timeHelper && (
                        <Flex direction="column" align="start" justify="center" gap="2" height="auto">
                            <TextTransition key="timehelp" className="text-5xl">
                                {timeHelper[0]}
                            </TextTransition>
                            <TextTransition key="timehelp1" className="font-serif text-7xl font-semibold">
                                {timeHelper[1]}
                            </TextTransition>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
}
