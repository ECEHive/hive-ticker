import { Cross1Icon } from "@radix-ui/react-icons";
import { Dialog, Flex, IconButton, SegmentedControl } from "@radix-ui/themes";
import { useCallback, useEffect, useState } from "react";
import AnnouncementEditor from "./config/AnnouncementEditor";
import HoursEditor from "./config/HoursEditor";
import SpotifyEditor from "./config/SpotifyEditor";

export default function Config({}) {
    const [configOpen, setConfigOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState("announcements");

    useEffect(() => {
        // listen for escape key press
        const handleKeyPress = (e) => {
            if (e.key === "Escape") {
                setConfigOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [setConfigOpen]);

    const closeConfig = useCallback(() => {
        setConfigOpen(false);
    }, [setConfigOpen]);

    return (
        <Dialog.Root open={configOpen}>
            <Dialog.Content minWidth="800px" width="100%" height="600px" minHeight="600px" maxHeight="600px">
                <Dialog.Description className="invisible"></Dialog.Description>
                <Flex
                    direction="column"
                    gap="4"
                    width="100%"
                    height="100%"
                    maxHeight="100%"
                    justify="start"
                    align="center"
                    overflow="visible"
                >
                    <Flex direction="row" justify="between" align="start" width="100%">
                        <Dialog.Title>Ticker Configuration</Dialog.Title>
                        <Dialog.Close>
                            <IconButton variant="soft" size="1" onClick={closeConfig}>
                                <Cross1Icon />
                            </IconButton>
                        </Dialog.Close>
                    </Flex>

                    <SegmentedControl.Root
                        value={selectedTab}
                        onValueChange={(value) => {
                            setSelectedTab(value);
                        }}
                        className="min-h-8 w-full"
                    >
                        <SegmentedControl.Item value="announcements">Announcements</SegmentedControl.Item>
                        <SegmentedControl.Item value="spotify">Spotify</SegmentedControl.Item>
                        <SegmentedControl.Item value="hours">Hours</SegmentedControl.Item>
                    </SegmentedControl.Root>

                    <Flex direction="column" height="auto" width="100%" flexGrow="1" overflow="hidden">
                        {selectedTab === "announcements" && <AnnouncementEditor />}
                        {selectedTab === "spotify" && <SpotifyEditor />}
                        {selectedTab === "hours" && <HoursEditor />}
                    </Flex>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
