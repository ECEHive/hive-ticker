// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import { Theme } from "@radix-ui/themes";
import Dashboard from "./Dashboard";
import { InfoProvider } from "./contexts/InfoContext";
import { SpotifyProvider } from "./contexts/SpotifyContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TimeProvider } from "./contexts/TimeContext";
import useTheme from "./hooks/useTheme";

export default function App() {
    return (
        <ThemeProvider>
            <AppChild />
        </ThemeProvider>
    );
}

function AppChild() {
    const { colorTheme } = useTheme();

    return (
        <Theme accentColor="amber" grayColor="mauve" appearance={colorTheme}>
            <TimeProvider>
                <InfoProvider>
                    <SpotifyProvider>
                        <Dashboard />
                    </SpotifyProvider>
                </InfoProvider>
            </TimeProvider>
        </Theme>
    );
}
