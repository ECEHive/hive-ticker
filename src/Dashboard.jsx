import { Box, Flex, Grid } from "@radix-ui/themes";
import Clock from "./components/Clock";
import Music from "./components/Music";
import Notices from "./components/Notices";

export default function Dashboard({}) {
    return (
        <Box
            maxWidth="100vw"
            maxHeight="100vh"
            minHeight="100vh"
            minWidth="100vw"
            width="100vw"
            height="100vh"
        >
            <Flex
                width="100%"
                height="100%"
                minWidth="100%"
                minHeight="100%"
                direction="column"
                justify="center"
                align="center"
            >
                <Grid
                    columns="4"
                    gap="4"
                    rows="auto 320px"
                    width="100%"
                    height="100%"
                >
                    <Box
                        gridColumn="1 / 4"
                        gridRow="1"
                        width="100%"
                        height="100%"
                    >
                        {/* <Clock /> */}
                        <Notices />
                    </Box>
                    <Box
                        gridColumn="4/5"
                        gridRow="1"
                        width="100%"
                        height="100%"
                    >
                        <Clock />
                    </Box>
                    <Box
                        gridColumn="1/5"
                        gridRow="2"
                        height="100%"
                        width="100%"
                        maxHeight="100%"
                    >
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
            </Flex>
        </Box>
    );
}
