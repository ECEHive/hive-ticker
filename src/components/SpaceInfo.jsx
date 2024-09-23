import { Box, Flex, Text } from "@radix-ui/themes";
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
    const { time, date } = useTime();

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
                    <img src={logo} className="h-[96px] w-auto" />
                </Flex>

                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    gap="1"
                    height="auto"
                >
                    <Text className="text-4xl">Today&apos;s hours</Text>
                    <Text className="font-serif text-8xl font-semibold">
                        10am-6pm
                    </Text>
                </Flex>

                {/* clock */}
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    gap="1"
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
                                    }}
                                    className="text-9xl"
                                >
                                    {digit(time[0])}
                                </TextTransition>
                            );
                        })}
                        <Text className="mb-3 font-sans text-3xl font-medium">
                            {time[1]}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}