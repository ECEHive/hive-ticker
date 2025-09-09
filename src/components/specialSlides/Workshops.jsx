import { Flex, Grid } from "@radix-ui/themes";
import { useEffect } from "react";
import newsletterQR from "../../assets/newsletter_qr.svg";
import useAirtable from "../../hooks/useAirtable";

export default function Workshops({}) {
    const workshopCalendar = useAirtable("workshops", 120000, (data) => {
        return data.sort((a, b) => new Date(a["Event Date"]) - new Date(b["Event Date"]));
    });

    useEffect(() => {
        console.log("workshopCalendar", workshopCalendar);
    }, [workshopCalendar]);

    return (
        <>
            <Flex direction="row" align="start" justify="start" width="100%">
                <Flex direction="column" align="start" justify="start" width="100%" gap="5">
                    <Flex direction="row" align="center" justify="start" height="" width="100%">
                        <p className="text-8xl font-bold">Upcoming workshops</p>
                    </Flex>
                    <p className="text-5xl font-normal">Sign ups are sent in our newsletter!</p>
                </Flex>
                <img src={newsletterQR} className="h-48" />
            </Flex>

            <Flex direction="column" overflow="auto" height="auto" width="100%" mt="6">
                <Grid className="" width="100%" gap="4" height="100%" columns="3" rows="auto">
                    {workshopCalendar.map((event) => (
                        <>
                            <Flex
                                key={event.id}
                                direction="column"
                                align="start"
                                justify="start"
                                p="5"
                                gap="3"
                                className="rounded-lg bg-zinc-800"
                            >
                                <Flex dir="row" align="center" justify="start" gap="3">
                                    <p className="text-4xl font-bold">{event["Name"]}</p>
                                </Flex>
                            </Flex>
                        </>
                    ))}
                </Grid>
            </Flex>
        </>
    );
}
