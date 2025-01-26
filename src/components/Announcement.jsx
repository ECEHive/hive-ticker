import { ExitIcon } from "@radix-ui/react-icons";
import { Box, Flex, Separator, Text } from "@radix-ui/themes";

export default function Announcement({}) {
    return (
        <Box minWidth="100%" height="100%" maxWidth="100%" p="7" pb="0" overflow="visible">
            <Flex direction="column" justify="start" align="center" width="100%" height="auto" minHeight="100%" gap="0">
                <Flex
                    direction="row"
                    justify="start"
                    align="center"
                    height="150px"
                    width="100%"
                    gap="9"
                    mb="6"
                    // className="bg-current"
                >
                    <ExitIcon width="100" height="100" />
                    <Text className="text-9xl font-bold">Closing soon</Text>
                </Flex>

                <Separator size="4" />

                <Flex
                    direction="column"
                    justify="start"
                    align="start"
                    width="100%"
                    gap="9"
                    overflow="auto"
                    flexBasis="0"
                    flexGrow="1"
                >
                    <Flex direction="column" justify="start" align="start" overflow="visible" my="7" mx="4">
                        <Text className="h-full text-9xl leading-[1.1em]">
                            The HIVE will be closing in 1 25 minutes. Please start to clean up your work area.
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}
