import { Box, Flex } from "@radix-ui/themes";
import { useCallback, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import logo from "../assets/hive_logo_white.svg";
import useSpotify from "../hooks/useSpotify";
import useTheme from "../hooks/useTheme";

export default function Music() {
    const { playerState, currentToken, spotifyEnabled } = useSpotify();
    const { colorTheme } = useTheme();

    // const [latestProgress, timestamp, durationMs, durationFormatted] = useMemo(() => {
    //     if (!playerState) return [0, 0, 0, "0:00"];

    //     return [
    //         playerState?.progress_ms,
    //         dayjs.utc(),
    //         dayjs.duration(playerState?.item.duration_ms),
    //         dayjs.duration(playerState?.item.duration_ms).format("m:ss"),
    //     ];
    // }, [playerState]);

    // const [progressMs, setProgressMs] = useState(0);
    // const [progressFormatted, setProgressFormatted] = useState("0:00");

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (!playerState?.is_playing) return;
    //         // const progress = dayjs.duration(dayjs.utc().diff(dayjs(timestamp), "ms")).add(latestProgress, "ms");
    //         // const min = dayjs.duration(Math.min(progress.asMilliseconds(), durationMs.asMilliseconds()));
    //         // setProgressMs(min.asMilliseconds());
    //         // setProgressFormatted(min.format("m:ss"));
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [latestProgress, timestamp, playerState, durationMs]);

    // const progressPercent = useMemo(() => {
    //     if (!playerState) return 0;
    //     return Math.min((progressMs / durationMs) * 100, 100);
    // }, [progressMs, durationMs, playerState]);

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
                {spotifyEnabled && playerState ? (
                    <Box
                        // className="border-t-2 border-[--sand-7]"
                        // className="mx-8 mb-8 h-[200px] w-auto rounded-2xl shadow-md"
                        className="h-[200px] w-full"
                        style={{
                            backgroundImage: spotifyEnabled && `url('${playerState?.item.album.images[0].url}')`,
                            backgroundSize: "100vw 100vh",
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
                                    `blur(100px) ${colorTheme === "dark" ? "brightness(0.2)" : "brightness(.7)"}`,
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
                                gap="8"
                                p="6"
                                // px="8"
                            >
                                <img
                                    src={playerState?.item.album.images[0].url}
                                    alt="album cover"
                                    className="h-full rounded-lg shadow-md"
                                />

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
                                                <p
                                                    className="max-w-full text-6xl font-bold text-gray-50"
                                                    ref={titleRef}
                                                >
                                                    {playerState?.item.name}
                                                </p>
                                                <div
                                                    style={{
                                                        width: "120px",
                                                    }}
                                                />
                                            </Marquee>
                                        ) : (
                                            <p className="max-w-full text-6xl font-bold text-gray-50" ref={titleRef}>
                                                {playerState?.item.name}
                                            </p>
                                        )}
                                        <p className="text-4xl text-gray-300">{playerState?.item.artists[0].name}</p>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                width="auto"
                                height="100%"
                                p="8"
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
                ) : (
                    <>
                        <Box className="absolute bottom-0 h-[130px] w-full p-10">
                            <Flex direction="row" justify="end" align="center" width="auto" height="100%">
                                <img
                                    src={logo}
                                    // width="100%"
                                    // height="100%"
                                    style={{
                                        width: "auto",
                                        height: "100%",
                                        filter: colorTheme === "light" && "invert(.9)",
                                        // filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2))",
                                    }}
                                />
                            </Flex>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
}
