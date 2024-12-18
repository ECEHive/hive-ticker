import { Box, Flex, Separator } from "@radix-ui/themes";
import Config from "./components/Config";
import Music from "./components/Music";
import Notices from "./components/Notices";
import SpaceInfo from "./components/SpaceInfo";
import useSpotify from "./hooks/useSpotify";

export default function Dashboard({}) {
    const { spotifyEnabled } = useSpotify();

    return (
        <Box
            maxWidth="100vw"
            maxHeight="100vh"
            minHeight="100vh"
            minWidth="100vw"
            width="100vw"
            height="100vh"
            overflow="hidden"
        >
            <Config />

            <Flex
                direction="column"
                // gap="6"
                height="100%"
                width="100%"
                maxHeight="100vh"
                overflow="hidden"
                display="inline-flex"
            >
                {/* <Grid
                columns="550px calc(100% - 550px)"
                rows="1fr auto"
                minWidth="100%"
                width="100%"
                height="100%"
                maxHeight="100%"
            > */}
                <Flex direction="row" height="100%" minHeight="0px" width="100%" position="relative">
                    <Box width="auto" height="100%">
                        <SpaceInfo />
                    </Box>
                    <Separator orientation="vertical" className="h-full" />
                    <Box width="100%" height="100%">
                        <Notices />
                    </Box>
                </Flex>
                <Separator orientation="horizontal" className="w-full" />
                <Box height="auto" width="100%">
                    <Music />
                </Box>
            </Flex>
            {/* </Grid> */}
        </Box>
    );
}
