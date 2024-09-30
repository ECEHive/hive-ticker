import { Button, Flex, Switch, Text } from "@radix-ui/themes";
import useSpotify from "../../hooks/useSpotify";

export default function SpotifyEditor({}) {
    const { currentToken, redirectToSpotifyAuthorize, logOut, spotifyEnabled, setSpotifyEnabled } = useSpotify();

    return (
        <Flex direction="column" justify="center" align="center" gap="2" width="100%" p="1">
            <Button
                className="w-56"
                onClick={redirectToSpotifyAuthorize}
                disabled={currentToken.access_token !== undefined}
            >
                Connect Spotify account
            </Button>
            <Button className="w-56" disabled={!currentToken.access_token} onClick={logOut}>
                Disconnect Spotify account
            </Button>
            <Flex direction="row" gap="2">
                <Switch
                    radius="small"
                    checked={spotifyEnabled}
                    onCheckedChange={(value) => {
                        setSpotifyEnabled(value);
                    }}
                />
                <Text size="2">Show music player</Text>
            </Flex>
        </Flex>
    );
}
