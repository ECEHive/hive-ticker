import { Box, Flex } from "@radix-ui/themes";
import Alert from "./components/Alert";
import Config from "./components/Config";
import Music from "./components/Music";
import Notices from "./components/Notices";
import SpaceInfo from "./components/SpaceInfo";
import WeatherAlerts from "./components/WeatherAlerts";
import useSpotify from "./hooks/useSpotify";
import useTime from "./hooks/useTime";

export default function Dashboard({}) {
    const { alertActive } = useTime();
    const { spotifyEnabled, playerState } = useSpotify();

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
                <WeatherAlerts />
                <Flex direction="row" height="100%" minHeight="0px" width="100%" position="relative">
                    <Box width="auto" height="100%" className="border-r-[3px] border-solid border-[--sand-7]">
                        <SpaceInfo />
                    </Box>
                    <Box width="100%" height="100%">
                        {alertActive ? <Alert /> : <Notices />}
                    </Box>
                </Flex>
                <Box
                    height="auto"
                    width="100%"
                    className={`${spotifyEnabled && playerState && "border-t-[3px]"} border-solid border-[--sand-7]`}
                >
                    <Music />
                </Box>
            </Flex>
            {/* </Grid> */}
        </Box>
    );
}
