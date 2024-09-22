// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import { Theme } from "@radix-ui/themes";
import Dashboard from "./Dashboard";
import { SpotifyProvider } from "./contexts/SpotifyContext";
import { TimeProvider } from "./contexts/TimeContext";

export default function App() {
    return (
        <Theme accentColor="amber" grayColor="gray" appearance="dark">
            <TimeProvider>
                <SpotifyProvider>
                    <Dashboard />
                </SpotifyProvider>
            </TimeProvider>
        </Theme>
    );
}
