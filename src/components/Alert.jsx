import { Box, Flex, Text } from "@radix-ui/themes";
import useTime from "../hooks/useTime";

export default function Alert({}) {
    const { alertContent } = useTime();

    return (
        <>
            {alertContent && (
                <Box minWidth="100%" height="100%" minHeight="100%" maxWidth="100%" p="7">
                    <Flex
                        direction="column"
                        justify="center"
                        align="center"
                        height="100%"
                        width="100%"
                        style={{
                            gap: "69px",
                        }}
                    >
                        <Flex direction="column" justify="center" align="center" width="auto" gap="5">
                            <alertContent.icon width="125" height="125" />
                            <Text className="text-center text-9xl font-bold">{alertContent.title}</Text>
                        </Flex>

                        <Flex direction="column" justify="start" align="start" width="auto" gap="6">
                            {alertContent?.bullets ? (
                                alertContent.bullets.map((bullet, index) => (
                                    <Flex direction="row" justify="start" align="center" gap="9" key={index}>
                                        <bullet.icon
                                            width="80"
                                            height="80"
                                            style={{ minWidth: "80px", minHeight: "80px" }}
                                        />

                                        <Flex direction="column" justify="start" align="start" height="auto">
                                            <Text className="text-6xl font-normal" style={{ lineHeight: "1.2em" }}>
                                                {bullet.text}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                ))
                            ) : (
                                <>
                                    <Text className="text-6xl font-normal" style={{ lineHeight: "1.2em" }}>
                                        {alertContent.text}
                                    </Text>
                                </>
                            )}
                        </Flex>
                    </Flex>
                </Box>
            )}
        </>
    );
}
