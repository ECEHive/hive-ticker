// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import { Theme } from "@radix-ui/themes";
import Dashboard from "./Dashboard";
import { TimeProvider } from "./contexts/TimeContext";

export default function App() {
    return (
        <Theme accentColor="Amber" grayColor="gray" appearance="dark">
            <TimeProvider>
                <Dashboard />
            </TimeProvider>
        </Theme>
    );
}
