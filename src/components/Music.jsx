import { Box, Button, Flex, Progress, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
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
            setProgressMs(progress);
            setProgressFormatted(progress.format("m:ss"));
        }, 1000);

        return () => clearInterval(interval);
    }, [latestProgress, timestamp, playerState]);

    const progressPercent = useMemo(() => {
        if (!playerState) return 0;
        return Math.min((progressMs / durationMs) * 100, 100);
    }, [progressMs, durationMs, playerState]);

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
                        direction="row"
                        align="center"
                        justify="start"
                        gap="4"
                        p="8"
                        style={{
                            backdropFilter: "blur(50px) brightness(0.4)",
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
                            p="4"
                        >
                            <Flex
                                direction="column"
                                align="start"
                                justify="start"
                                gap="4"
                                width="100%"
                                maxWidth="100%"
                                overflow="hidden"
                            >
                                <p className="max-w-full overflow-ellipsis whitespace-nowrap text-7xl font-bold">
                                    {playerState?.item.name}
                                </p>
                                <p className="text-4xl text-gray-300">
                                    {playerState?.item.artists[0].name}
                                </p>
                            </Flex>

                            <Flex
                                direction="row"
                                justify="center"
                                align="center"
                                width="100%"
                                gap="6"
                            >
                                <Text className="w-16 max-w-16 text-left text-2xl">
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
                                <Text className="w-16 max-w-16 text-right text-2xl">
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
