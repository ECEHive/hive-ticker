import { Box, Button, Flex, Progress, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import useSpotify from "../hooks/useSpotify";

export default function Music() {
    const { playerState, currentToken, redirectToSpotifyAuthorize } =
        useSpotify();

    const [latestProgress, timestamp, durationMs, durationFormatted] =
        useMemo(() => {
            if (!playerState) return [0, 0, 0, "0:00"];

            return [
                playerState?.progress_ms,
                dayjs.utc(),
                dayjs.duration(playerState?.item.duration_ms),
                dayjs.duration(playerState?.item.duration_ms).format("m:ss"),
            ];
        }, [playerState]);

    const [progressMs, setProgressMs] = useState(0);
    const [progressFormatted, setProgressFormatted] = useState("0:00");

    useEffect(() => {
        const interval = setInterval(() => {
            if (!playerState?.is_playing) return;
            const progress = dayjs
                .duration(dayjs.utc().diff(dayjs(timestamp), "ms"))
                .add(latestProgress, "ms");
            const min = dayjs.duration(
                Math.min(
                    progress.asMilliseconds(),
                    durationMs.asMilliseconds(),
                ),
            );
            setProgressMs(min.asMilliseconds());
            setProgressFormatted(progress.format("m:ss"));
        }, 1000);

        return () => clearInterval(interval);
    }, [latestProgress, timestamp, playerState, durationMs]);

    const progressPercent = useMemo(() => {
        if (!playerState) return 0;
        return Math.min((progressMs / durationMs) * 100, 100);
    }, [progressMs, durationMs, playerState]);

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
            console.log("pausing marquee");
            setPlayMarquee(false);
            setTimeout(
                () => {
                    setPlayMarquee(true);
                },
                disableWait ? 0 : 5000,
            );
        } else {
            console.log("stopping marquee");
            setPlayMarquee(false);
        }
    }, [enableMarquee, disableWait]);

    useEffect(() => {
        if (!titleRef.current || !infoRef.current || !playerState) return;
        if (currentTrackId !== playerState?.item.id) {
            console.log("song change");
            setcurrentTrackId(playerState.item.id);
            setEnableMarquee(true);
            setDisableWait(true);
            setPlayMarquee(true);
            console.log("enable lockout");

            setTimeout(() => {
                console.log("disable lockout");
                setEnableMarquee(
                    titleRef.current.offsetWidth > infoRef.current.offsetWidth,
                );
                setDisableWait(false);
            }, 500);
        }
    }, [playerState, titleRef, infoRef, currentTrackId]);

    return (
        <>
            {currentToken.access_token ? (
                <Box
                    height="100%"
                    width="100%"
                    maxWidth="100%"
                    maxHeight="100%"
                    style={{
                        backgroundImage: `url('${playerState?.item.album.images[0].url}')`,
                        backgroundSize: "100vw 100vh",
                        backgroundPosition: "center",
                        backgroundClip: "content-box",
                    }}
                >
                    <Flex
                        width="100%"
                        height="100%"
                        minWidth="100%"
                        maxHeight="100%"
                        maxWidth="100%"
                        overflow="hidden"
                        direction="column"
                        align="center"
                        justify="start"
                        gap="6"
                        p="8"
                        style={{
                            backdropFilter: "blur(50px) brightness(0.25)",
                        }}
                    >
                        <img
                            src={playerState?.item.album.images[0].url}
                            alt="album cover"
                            style={{
                                height: "100%",
                            }}
                        />

                        <Flex
                            direction="column"
                            align="start"
                            justify="between"
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
                                <Marquee
                                    onCycleComplete={pauseMarquee}
                                    play={playMarquee}
                                    loop={0}
                                    style={{ overflow: "hidden" }}
                                >
                                    <p
                                        className="max-w-full text-7xl font-bold"
                                        ref={titleRef}
                                    >
                                        {playerState?.item.name}
                                    </p>
                                    <div
                                        style={{
                                            width: enableMarquee
                                                ? `calc(${infoRef?.current?.offsetWidth - titleRef?.current?.offsetWidth})`
                                                : "120px",
                                        }}
                                    />
                                </Marquee>
                                <p className="text-4xl text-gray-300">
                                    {playerState?.item.artists[0].name}
                                </p>
                            </Flex>

                            <Flex
                                direction="row"
                                justify="center"
                                align="center"
                                width="100%"
                                gap="4"
                            >
                                <Text className="w-16 min-w-16 text-left text-2xl">
                                    {progressFormatted}
                                </Text>
                                <Progress
                                    className="w-full"
                                    size="3"
                                    value={progressPercent}
                                    variant="surface"
                                    color="gray"
                                    highContrast
                                />
                                <Text className="w-16 min-w-16 text-right text-2xl">
                                    {durationFormatted}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            ) : (
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    width="100%"
                    height="100%"
                    gap="4"
                >
                    <Button
                        size="4"
                        variant="surface"
                        onClick={redirectToSpotifyAuthorize}
                        color="amber"
                    >
                        Connect Spotify
                    </Button>
                </Flex>
            )}
        </>
    );
}
