import { Checkbox, Flex, Text, TextField } from "@radix-ui/themes";
import useTime from "../../hooks/useTime";

const validation = "([01]?[0-9]|2[0-3]):[0-5][0-9]";

export default function HoursEditor({}) {
    const { hours, setHours } = useTime();

    return (
        <Flex direction="column" gap="2" width="100%" height="100%" align="center" p="1">
            <Text className="mb-2 text-xl font-bold">Use 24 hour time :)</Text>
            {Object.keys(hours).map((dayOfWeek, index) => {
                const data = hours[dayOfWeek];
                return (
                    <Flex direction="row" gap="2" justify="center" align="center" key={index}>
                        <Text className="w-32">{dayOfWeek}</Text>
                        <Checkbox
                            checked={data.open}
                            onCheckedChange={(value) => {
                                setHours((prev) => {
                                    return {
                                        ...prev,
                                        [dayOfWeek]: {
                                            ...prev[dayOfWeek],
                                            open: value,
                                        },
                                    };
                                });
                            }}
                        />
                        <TextField.Root
                            className="w-16"
                            value={data.hours[0]}
                            onChange={(e) => {
                                setHours((prev) => {
                                    return {
                                        ...prev,
                                        [dayOfWeek]: {
                                            ...prev[dayOfWeek],
                                            hours: [e.target.value, prev[dayOfWeek].hours[1]],
                                        },
                                    };
                                });
                            }}
                        ></TextField.Root>
                        <TextField.Root
                            className="w-16"
                            value={data.hours[1]}
                            onChange={(e) => {
                                let correct = e.target.value;
                                if (correct.length >= 5 || correct.length === 0) {
                                    correct = "00:00";
                                }
                                setHours((prev) => {
                                    return {
                                        ...prev,
                                        [dayOfWeek]: {
                                            ...prev[dayOfWeek],
                                            hours: [prev[dayOfWeek].hours[0], e.target.value],
                                        },
                                    };
                                });
                            }}
                        ></TextField.Root>
                    </Flex>
                );
            })}
        </Flex>
    );
}
