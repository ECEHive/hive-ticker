import { DotFilledIcon } from "@radix-ui/react-icons";
import { Box, Flex } from "@radix-ui/themes";
import { useCallback, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { FaMusic } from "react-icons/fa6";
import logo from "../../assets/hive_logo_white.svg";
import useSpotify from "../../hooks/useSpotify";
import useTheme from "../../hooks/useTheme";

export default function Footer() {
    const { playerState, spotifyEnabled } = useSpotify();
    const { colorTheme } = useTheme();

    const [playMarquee, setPlayMarquee] = useState(true);
    const [currentTrackId, setcurrentTrackId] = useState(null);
    const [enableMarquee, setEnableMarquee] = useState(false);
    const [disableWait, setDisableWait] = useState(false);
    const titleRef = useRef(null);
    const infoRef = useRef(null);

    const pauseMarquee = useCallback(() => {
        // if titleRef is smaller than its container, don't pause
        if (enableMarquee) {
            // check if titleRef is not in the home position
            setPlayMarquee(false);
            setTimeout(
                () => {
                    setPlayMarquee(true);
                },
                disableWait ? 0 : 5000,
            );
        } else {
            setPlayMarquee(false);
        }
    }, [enableMarquee, disableWait]);

    useEffect(() => {
        if (!titleRef.current || !infoRef.current || !playerState) return;
        if (currentTrackId !== playerState?.item.id) {
            setcurrentTrackId(playerState.item.id);
            setEnableMarquee(true);
            setDisableWait(true);
            setPlayMarquee(true);

            setTimeout(() => {
                setEnableMarquee(titleRef.current.offsetWidth > infoRef.current.offsetWidth);
                setDisableWait(false);
            }, 1);
        }
    }, [playerState, titleRef, infoRef, currentTrackId]);

    return (
        <>
            <Box height="auto" width="100%" maxWidth="100%" minWidth="100%">
                <Box
                    // className="border-t-2 border-[--sand-7]"
                    // className="mx-8 mb-8 h-[200px] w-auto rounded-2xl shadow-md"
                    className="h-[130px] w-full"
                    style={{
                        backgroundImage: spotifyEnabled && `url('${playerState?.item?.album?.images[0]?.url}')`,
                        backgroundSize: "100% auto",
                        backgroundPosition: "center",
                        backgroundClip: "border-box",
                    }}
                >
                    <Flex
                        direction="row"
                        align="center"
                        justify="between"
                        width="100%"
                        height="100%"
                        style={{
                            backdropFilter:
                                spotifyEnabled &&
                                playerState &&
                                `blur(75px) ${colorTheme === "dark" ? "brightness(0.2)" : "brightness(0.7)"}`,
                        }}
                        // className="rounded-2xl"
                    >
                        <Flex
                            width="100%"
                            height="100%"
                            maxHeight="100%"
                            maxWidth="100%"
                            overflow="hidden"
                            direction="row"
                            align="center"
                            justify="start"
                            gap="5"
                            p="6"
                            // px="8"
                        >
                            {spotifyEnabled && playerState?.item && (
                                <>
                                    <FaMusic size={40} />

                                    <Flex
                                        direction="column"
                                        align="start"
                                        justify="center"
                                        gap="4"
                                        width="100%"
                                        maxWidth="100%"
                                        height="100%"
                                        overflow="hidden"
                                        // p="4"
                                    >
                                        <Flex
                                            direction="column"
                                            align="start"
                                            justify="start"
                                            gap="4"
                                            width="100%"
                                            maxWidth="100%"
                                            overflow="hidden"
                                            ref={infoRef}
                                        >
                                            {enableMarquee ? (
                                                <Marquee
                                                    onCycleComplete={pauseMarquee}
                                                    play={playMarquee}
                                                    loop={0}
                                                    style={{
                                                        overflow: "hidden",
                                                        maskImage:
                                                            "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%)",
                                                    }}
                                                >
                                                    <Flex
                                                        dir="row"
                                                        justify="center"
                                                        align="center"
                                                        gap="2"
                                                        ref={titleRef}
                                                    >
                                                        <p className="text-[3.5rem] font-semibold leading-none text-gray-50">
                                                            {playerState?.item.name}
                                                        </p>
                                                        <DotFilledIcon width="25px" height="25px" className="mx-2" />
                                                        <p className="text-[3.4rem] font-normal leading-none text-gray-300">
                                                            {playerState?.item.artists
                                                                .map((artist) => artist.name)
                                                                .join(", ")}
                                                        </p>

                                                        <div
                                                            style={{
                                                                width: "120px",
                                                            }}
                                                        />
                                                    </Flex>
                                                </Marquee>
                                            ) : (
                                                <Flex
                                                    dir="row"
                                                    justify="center"
                                                    align="center"
                                                    gap="2"
                                                    ref={titleRef}
                                                    className="whitespace-nowrap"
                                                >
                                                    <p className="text-[3.5rem] font-semibold leading-none text-gray-50">
                                                        {playerState?.item.name}
                                                    </p>
                                                    <DotFilledIcon width="25px" height="25px" className="mx-2" />
                                                    <p className="text-[3.4rem] font-normal leading-none text-gray-300">
                                                        {playerState?.item.artists
                                                            .map((artist) => artist.name)
                                                            .join(", ")}
                                                    </p>
                                                </Flex>
                                            )}
                                            {/* <p className="text-4xl text-gray-300">{playerState?.item.artists[0].name}</p> */}
                                        </Flex>
                                    </Flex>
                                </>
                            )}
                        </Flex>
                        <Flex
                            direction="column"
                            justify="center"
                            align="end"
                            width="auto"
                            height="100%"
                            p="6"
                            // className="to-[ bg-gradient-to-r from-transparent from-0% to-[--gray-1] to-100%"
                        >
                            <img
                                src={logo}
                                // width="100%"
                                // height="100%"
                                style={{
                                    width: "auto",
                                    height: "100%",
                                    // filter: colorTheme === "light" && "invert(1)",
                                    // filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2))",
                                }}
                            />
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </>
    );
}
