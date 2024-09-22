import { Box, Button, Flex, Progress, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useMemo } from "react";
import useSpotify from "../hooks/useSpotify";

export default function Music() {
    const { playerState, currentToken, redirectToSpotifyAuthorize } =
        useSpotify();

    const [progress, duration] = useMemo(() => {
        if (!playerState) return [0, 0];

        const start = dayjs.duration({
            milliseconds: playerState?.progress_ms,
        });
        const end = dayjs.duration({
            milliseconds: playerState?.item.duration_ms,
        });

        return [start.format("m:ss"), end.format("m:ss")];
    }, [playerState]);

    const progressPercent = useMemo(() => {
        if (!playerState) return 0;
        return (playerState?.progress_ms / playerState?.item.duration_ms) * 100;
    }, [playerState]);

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
                            height="100%"
                            p="4"
                        >
                            <Flex
                                direction="column"
                                align="start"
                                justify="start"
                                gap="4"
                            >
                                <p className="text-7xl font-bold">
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
                                <Text className="text-2xl">{progress}</Text>
                                <Progress
                                    className="w-full"
                                    size="3"
                                    value={progressPercent}
                                    variant="surface"
                                    color="gray"
                                    highContrast
                                    // duration={`${parseInt(playerState?.item.duration_ms / 1000)}s`}
                                />
                                <Text className="text-2xl">{duration}</Text>
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
                        color="yellow"
                    >
                        Connect your Spotify
                    </Button>
                </Flex>
            )}
        </>
    );
}
