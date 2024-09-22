import { Box } from "@radix-ui/themes";
import logo from "../assets/hive_logo_white.svg";

export default function Footer({}) {
    return (
        <Box height="100%" width="100%" minHeight="100%" minWidth="100%" p="4">
            <img src={logo} alt="logo" style={{ height: "50%" }} />
        </Box>
    );
}
