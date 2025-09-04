import { Badge, Flex } from "@radix-ui/themes";
import dayjs from "dayjs";
import newsletterQR from "../../assets/newsletter_qr.png";
import useAirtable from "../../hooks/useAirtable";

export default function Workshops({}) {
    const workshopCalendar = useAirtable("workshops", 120000, (data) => {
        return data.sort((a, b) => new Date(a["Proposed Date"]) - new Date(b["Proposed Date"]));
    });

    <>
        <Flex direction="row" align="start" justify="start" width="100%">
            <Flex direction="column" align="start" justify="start" width="100%" gap="5">
                <Flex direction="row" align="center" justify="start" height="" width="100%">
                    <p className="text-8xl font-bold">Upcoming workshops</p>
                    {/* <img src={hiveLogo} className="ml-8 h-20" alt="Hive logo" /> */}
                </Flex>
                <p className="text-5xl font-normal">Sign ups are sent in our newsletter!</p>
            </Flex>
            <img src={newsletterQR} className="h-48" />
        </Flex>

        <Flex direction="column" overflow="auto" height="auto" width="100%" mt="6">
            {workshopCalendar.map((event) => (
                <>
                    <Flex
                        direction="row"
                        align="center"
                        justify="start"
                        height=""
                        width="100%"
                        gap="8"
                        py="6"
                        className="border-b-[3px] border-solid border-[--sand-7]"
                    >
                        <p className="grow text-6xl font-medium">{event["Workshop Name"]}</p>
                        <Badge size="3" variant="soft" className="h-auto rounded-2xl p-5 text-4xl">
                            {dayjs(event["Proposed Date"]).format("dddd MMM. D")}
                        </Badge>
                    </Flex>
                </>
            ))}
        </Flex>
    </>;
}
