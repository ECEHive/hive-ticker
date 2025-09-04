import { Box, Flex } from "@radix-ui/themes";
import Music from "./components/Footer";
import Alert from "./components/MainAlert";
import Notices from "./components/Notices";
import SpaceInfo from "./components/SpaceInfo";
import useTime from "./hooks/useTime";

export default function Ticker({}) {
    const { alertActive } = useTime();

    return (
        <>
            <Flex direction="row" height="100%" minHeight="0px" width="100%" position="relative">
                <Box width="auto" height="100%" className="border-r-[3px] border-solid border-[--sand-7]">
                    <SpaceInfo />
                </Box>
                <Box width="100%" height="100%">
                    {alertActive ? <Alert /> : <Notices />}
                </Box>
            </Flex>
            <Box height="auto" width="100%" className="border-t-[3px] border-solid border-[--sand-7]">
                <Music />
            </Box>
        </>
    );
}
