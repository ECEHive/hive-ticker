import { Flex } from "@radix-ui/themes";
import Alert from "./components/MainAlert";
// import Workshops from "./components/specialSlides/Workshops";
import Printers from "./components/specialSlides/Printers";
import useTime from "./hooks/useTime";

export default function Downstairs({}) {
    const { alertActive } = useTime();

    return (
        <>
            <Flex
                direction="column"
                height="100%"
                minHeight="100%"
                width="100%"
                minWidth="100%"
                position="relative"
                justify="start"
                align="start"
                p="7"
                gap="6"
            >
                {alertActive ? (
                    <Alert />
                ) : (
                    <>
                        <Printers />
                    </>
                )}
            </Flex>
        </>
    );
}
