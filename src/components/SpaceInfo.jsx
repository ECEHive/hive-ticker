import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Callout, Flex, Text } from "@radix-ui/themes";
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
            height="100%"
            minHeight="100%"
            minWidth="100%"
            p="8"
            className="border-l-2 border-neutral-800"
        >
            <Box width="100%" height="50px" mb="9">
                <img src={logo} style={{ width: "100%", height: "100%" }} />
            </Box>
            <Flex
                direction="column"
                justify="start"
                align="center"
                gap="9"
                height="100%"
                width="100%"
            >
                {/*  */}
                <Flex direction="column" align="center" gap="4" width="100%">
                    <Flex
                        height="auto"
                        direction="row"
                        align="end"
                        justify="center"
                        width="100%"
                    >
                        {digitMap.map((digit, index) => {
                            return (
                                <TextTransition
                                    inline
                                    // delay={(digitMap.length - index) * 100}
                                    key={index}
                                    style={{
                                        fontFamily: "Rubik Doodle Shadow",
                                        fontWeight: 400,
                                        lineHeight: 0.8,
                                        fontSize: "100px",
                                    }}
                                >
                                    {digit(time[0])}
                                </TextTransition>
                            );
                        })}
                        <Text
                            style={{
                                fontFamily: "Rubik Doodle Shadow",
                                fontSize: "30px",
                                lineHeight: 1,
                            }}
                        >
                            {time[1]}
                        </Text>
                    </Flex>
                </Flex>

                <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    className="self-end"
                    width="100%"
                >
                    <Text>Today&apos;s hours</Text>

                    <Callout.Root
                        size="3"
                        variant="soft"
                        color="red"
                        highContrast
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                    >
                        <Callout.Icon>
                            <ExclamationTriangleIcon fontSize="30px" />
                        </Callout.Icon>
                        <Callout.Text
                            style={{
                                fontSize: "30px",
                                lineHeight: 1,
                            }}
                        >
                            The HIVE closes in 30 minutes
                        </Callout.Text>
                    </Callout.Root>
                </Flex>
            </Flex>
        </Box>
    );
}
