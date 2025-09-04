import { Flex } from "@radix-ui/themes";
import Alert from "./components/MainAlert";
import Hero from "./components/specialSlides/Hero";
import useTime from "./hooks/useTime";

export default function FrontDesk({}) {
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
                        {/* <Workshops /> */}
                        <Hero />
                    </>
                )}
            </Flex>
        </>
    );
}
