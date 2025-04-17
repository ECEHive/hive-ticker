import { Box, Flex } from "@radix-ui/themes";

export default function Calendar({}) {
    return (
        <Box width="100%" height="100%">
            <p className="text-9xl font-bold">Upcoming events</p>
            <Flex width="100%" height="auto" direction="column" justify="start" align="center"></Flex>
        </Box>
    );
}
