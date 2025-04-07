import { Callout } from "@radix-ui/themes";

export default function TopAlert({}) {
    return (
        <Callout.Root size="3" color="blue" className="items-center justify-center rounded-none">
            {/* <Callout.Icon>
                <InfoCircledIcon
                    style={{
                        width: "2.5rem",
                        height: "2.5rem",
                    }}
                />
            </Callout.Icon> */}
            <Callout.Text className="text-[3rem] leading-none">
                The Hive closes for the semester on April 18
            </Callout.Text>
        </Callout.Root>
    );
}
