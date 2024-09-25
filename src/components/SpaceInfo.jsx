import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import TextTransition from "react-text-transition";
import logo from "../assets/hive_logo_white.svg";
import useTime from "../hooks/useTime";

const digitMap = [
    (time) => (time[0] === "0" ? "" : time[0]),
    (time) => time[1],
    () => ":",
    (time) => time[3],
    (time) => time[4],
];

export default function SpaceInfo({}) {
    const { time, date, openState } = useTime();

    const timeHelper = useMemo(() => {
        if (!openState?.openToday) return ["Closed", "Today"];

        const openTime = dayjs()
            .set("hour", openState.hours[0].split(":")[0])
            .set("minute", openState.hours[0].split(":")[1]);
        const closeTime = dayjs()
            .set("hour", openState.hours[1].split(":")[0])
            .set("minute", openState.hours[1].split(":")[1]);

        const closingTime = dayjs()
            .set("hour", openState.hours[1].split(":")[0])
            .set("minute", openState.hours[1].split(":")[1]);

        const timeUntilClose = dayjs.duration(
            closingTime.diff(dayjs(), "milliseconds"),
        );
        const timeUntilOpen = dayjs.duration(
            openTime.diff(dayjs(), "milliseconds"),
        );

        console.log(openState);

        if (timeUntilOpen.asMinutes() < 60 && timeUntilOpen.asMinutes() > 0) {
            return ["Opening in", timeUntilOpen.humanize()];
        } else if (
            timeUntilClose.asMinutes() < 60 &&
            timeUntilClose.asMinutes() > 0
        ) {
            return ["Closing in", timeUntilClose.humanize()];
        } else if (!openState.openNow) {
            if (openState.openToday) {
                return ["Closed", "After hours"];
            } else {
                return ["Closed", "Today"];
            }
        } else {
            return [
                "Today's hours",
                `${openTime.format("hA")} - ${closeTime.format("hA")}`,
            ];
        }
    }, [openState]);

    useEffect(() => {}, []);

    return (
        <Box
            width="100%"
            height="100%"
            minHeight="100%"
            minWidth="100%"
            maxHeight="100%"
            maxWidth="100%"
            py="6"
            p="8"
            className="overflow-hidden"
        >
            <Flex
                direction="row"
                justify="between"
                align="center"
                gap="8"
                height="100%"
                width="100%"
            >
                <Flex
                    direction="column"
                    align="start"
                    justify="center"
                    gap="2"
                    height="auto"
                >
                    <img src={logo} className="h-[100px] w-auto" />
                </Flex>

                {/* clock/hours */}
                <Flex
                    direction="row"
                    align="center"
                    justify="center"
                    gap="2"
                    height="100%"
                    width="auto"
                >
                    {timeHelper && (
                        <>
                            <Flex
                                direction="column"
                                align="end"
                                justify="center"
                                gap="0"
                                height="auto"
                            >
                                <TextTransition
                                    key="timehelp"
                                    className="text-5xl"
                                >
                                    {timeHelper[0]}
                                </TextTransition>
                                <TextTransition
                                    key="timehelp1"
                                    className="font-serif text-7xl font-semibold"
                                >
                                    {timeHelper[1]}
                                </TextTransition>
                            </Flex>

                            <DividerVerticalIcon
                                className="h-auto w-12"
                                color="gray"
                            />
                        </>
                    )}

                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        gap="2"
                        height="auto"
                    >
                        {/* <Text className="text-4xl">Time</Text> */}
                        <Flex
                            height="auto"
                            direction="row"
                            align="end"
                            justify="end"
                        >
                            {digitMap.map((digit, index) => {
                                return (
                                    <TextTransition
                                        inline
                                        // delay={(digitMap.length - index) * 100}
                                        key={index}
                                        style={{
                                            fontFamily: "Rubik",
                                            fontWeight: 600,
                                            lineHeight: 1,
                                            fontSize: "9rem",
                                        }}
                                        className=""
                                    >
                                        {digit(time[0])}
                                    </TextTransition>
                                );
                            })}
                            <Text className="mb-3 font-sans text-5xl font-medium">
                                {time[1]}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}
