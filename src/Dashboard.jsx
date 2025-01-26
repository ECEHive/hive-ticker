import { Box, Flex } from "@radix-ui/themes";
import Announcement from "./components/Announcement";
import Config from "./components/Config";
import Music from "./components/Music";
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
                    <Box width="auto" height="100%" className="border-r-[3px] border-solid border-[--sand-7]">
                        <SpaceInfo />
                    </Box>
                    <Box width="100%" height="100%">
                        {/* <Notices /> */}
                        <Announcement />
                    </Box>
                </Flex>
                <Box height="auto" width="100%" className="border-t-[3px] border-solid border-[--sand-7]">
                    <Music />
                </Box>
            </Flex>
            {/* </Grid> */}
        </Box>
    );
}
