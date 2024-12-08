import { Flex, Switch, Text } from "@radix-ui/themes";
import useTheme from "../../hooks/useTheme";

export default function GeneralEditor({}) {
    const { colorTheme, toggleColorTheme } = useTheme();

    return (
        <Flex direction="column" justify="center" align="center" gap="2" width="100%" p="1">
            <Flex direction="row" gap="2">
                <Switch radius="small" checked={colorTheme === "light"} onCheckedChange={toggleColorTheme} />
                <Text size="2">Light mode</Text>
            </Flex>
        </Flex>
    );
}
