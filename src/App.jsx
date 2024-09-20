// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import Dashboard from "./Dashboard";
import { TimeProvider } from "./contexts/TimeContext";

export default function App() {
    return (
        <TimeProvider>
            <Dashboard />
        </TimeProvider>
    );
}
