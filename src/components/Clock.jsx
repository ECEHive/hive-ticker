import { Box, Flex, Text } from "@radix-ui/themes";
import TextTransition from "react-text-transition";
import useTime from "../hooks/useTime";

const digitMap = [
    (time) => (time[0] === "0" ? "" : time[0]),
    (time) => time[1],
    () => ":",
    (time) => time[3],
    (time) => time[4],
];

export default function Clock({}) {
    const { time } = useTime();

    return (
        <Box height="100%" minHeight="100%" minWidth="100%">
            <Flex
                width="100%"
                height="100%"
                direction="column"
                justify="center"
                align="center"
                gap={10}
            >
                <Flex height="auto" direction="row" align="end">
                    {digitMap.map((digit, index) => {
                        return (
                            <TextTransition
                                inline
                                delay={(digitMap.length - index) * 100}
                                key={index}
                                style={{
                                    fontFamily: "Rubik Doodle Shadow",
                                    fontWeight: 400,
                                    lineHeight: 0.8,
                                    fontSize: "250px",
                                }}
                            >
                                {digit(time[0])}
                            </TextTransition>
                        );
                    })}
                    <Text
                        style={{
                            fontFamily: "Rubik Doodle Shadow",
                            fontSize: "50px",
                            lineHeight: 1,
                        }}
                    >
                        {time[1]}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
}
