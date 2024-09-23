import { Box, Grid } from "@radix-ui/themes";
import Music from "./components/Music";
import Notices from "./components/Notices";
import SpaceInfo from "./components/SpaceInfo";
import useSpotify from "./hooks/useSpotify";

export default function Dashboard({}) {
    const { playerState, currentToken } = useSpotify();

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
            {/* <Flex
                width="100%"
                height="100%"
                minWidth="100%"
                minHeight="100%"
                maxHeight="100%"
                maxWidth="100%"
                direction="column"
                justify="center"
                align="center"
            > */}
            <Grid
                columns={
                    // playerState?.is_playing ? "calc(100% - 550px) 550px" : "1fr"
                    "calc(100% - 550px) 550px"
                }
                rows="calc(100% - 225px) 225px"
                width="100%"
                height="100%"
                maxHeight="100%"
            >
                <Box gridColumn="1" gridRow="1" width="100%" height="100%">
                    {/* <Clock /> */}
                    <Notices />
                </Box>
                {/* {playerState?.is_playing && ( */}
                <Box gridColumn="2" gridRow="1" width="100%" height="100%">
                    <Music />
                </Box>
                {/* )} */}
                <Box
                    gridColumn="1/5"
                    gridRow="2"
                    height="100%"
                    width="100%"
                    maxHeight="100%"
                >
                    <SpaceInfo />
                </Box>
                {/* <Box
                        gridColumn="4/5"
                        gridRow="2"
                        width="100%"
                        maxHeight="192px"
                    >
                        <Footer />
                    </Box> */}
            </Grid>
            {/* </Flex> */}
        </Box>
    );
}
