import { PlusIcon } from "@radix-ui/react-icons";
import {
    Box,
    Button,
    Dialog,
    Flex,
    Grid,
    IconButton,
    RadioCards,
    ScrollArea,
    SegmentedControl,
    Text,
    TextArea,
} from "@radix-ui/themes";
import Music from "./components/Music";
import Notices from "./components/Notices";
import SpaceInfo from "./components/SpaceInfo";
import useSpotify from "./hooks/useSpotify";
import useTime from "./hooks/useTime";

export default function Dashboard({}) {
    const { playerState, currentToken } = useSpotify();
    const { openState } = useTime();

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
            <Dialog.Root open>
                <Dialog.Content minHeight="500px" height="100%" width="100%">
                    <Dialog.Title>Ticker control</Dialog.Title>

                    <SegmentedControl.Root
                        defaultValue="announcements"
                        className="w-full"
                    >
                        <SegmentedControl.Item value="announcements">
                            Announcements
                        </SegmentedControl.Item>
                        <SegmentedControl.Item value="spotify">
                            Spotify
                        </SegmentedControl.Item>
                        <SegmentedControl.Item value="hours">
                            Hours
                        </SegmentedControl.Item>
                    </SegmentedControl.Root>

                    <Flex
                        direction="column"
                        minHeight="100%"
                        width="100%"
                        mt="4"
                    >
                        <Flex
                            direction="column"
                            gap="2"
                            width="100%"
                            height="100%"
                        >
                            <Flex
                                direction="row"
                                gap="2"
                                width="100%"
                                height="auto"
                            >
                                <Box className="h-full w-1/3">
                                    {/* announcement list */}

                                    <ScrollArea
                                        scrollbars="vertical"
                                        className="w-full"
                                    >
                                        <RadioCards.Root
                                            defaultValue="1"
                                            columns="1"
                                        >
                                            <RadioCards.Item value="1">
                                                <Flex
                                                    direction="column"
                                                    width="100%"
                                                >
                                                    <Text weight="bold">
                                                        Welcome
                                                    </Text>
                                                    <Text>date</Text>
                                                </Flex>
                                            </RadioCards.Item>
                                        </RadioCards.Root>
                                    </ScrollArea>
                                    <Flex
                                        direction="row"
                                        gap="2"
                                        width="100%"
                                        justify="center"
                                    >
                                        <IconButton size="1">
                                            <PlusIcon />
                                        </IconButton>
                                    </Flex>
                                </Box>

                                <Flex
                                    direction="column"
                                    className="h-full w-2/3"
                                >
                                    <TextArea
                                        placeholder="Write some markdown..."
                                        className="min-h-full"
                                    ></TextArea>
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end" flexGrow="1">
                            {/* <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close> */}
                            <Dialog.Close>
                                <Button>Save</Button>
                            </Dialog.Close>
                        </Flex>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>

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
                {/* {playerState && ( */}
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
