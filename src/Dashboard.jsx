import { Box, Grid } from "@radix-ui/themes";
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

            <Grid
                columns={spotifyEnabled ? "calc(100% - 550px) 550px" : "100%"}
                rows="calc(100% - 250px) 250px"
                width="100%"
                height="100%"
                maxHeight="100%"
            >
                <Box gridColumn="1" gridRow="1" width="100%" height="100%">
                    {/* <Clock /> */}
                    <Notices />
                </Box>
                {spotifyEnabled && (
                    <Box gridColumn="2" gridRow="1" width="100%" height="100%">
                        {/* <Music /> */}
                        <SpaceInfo />
                    </Box>
                )}
                <Box gridColumn="1/3" gridRow="2" height="100%" width="100%" maxHeight="100%">
                    {/* <SpaceInfo /> */}
                    <Music />
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
