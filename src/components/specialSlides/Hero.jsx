import { Flex } from "@radix-ui/themes";
import hiveLogoWhite from "../../assets/hive_logo_ondark.svg";
import idcSilhouette from "../../assets/idc_silhouette.svg";
import useTime from "../../hooks/useTime";

export default function Hero({}) {
    const { openState } = useTime();

    return (
        <>
            <Flex direction="column" height="100%" width="100%" justify="center" align="center" position="relative">
                <Flex direction="column" align="center" justify="center" height="auto" width="auto" zIndex="1" gap="6">
                    <Flex
                        direction="row"
                        align="center"
                        justify="center"
                        height="auto"
                        width="auto"
                        className="text-9xl font-bold"
                    >
                        <p>Welcome to&nbsp;</p>
                        <img src={hiveLogoWhite} alt="Hive Logo" className="h-24" />
                    </Flex>

                    <Flex direction="row" justify="center" align="center">
                        {openState?.openNow ? (
                            <span className="inline-flex w-full text-center text-5xl font-medium">
                                <p className="text-[--gray-11]">Today&apos;s hours are&nbsp;</p>
                                <p>
                                    {openState?.hours[0].format("hA")}-{openState?.hours[1].format("hA")}
                                </p>
                            </span>
                        ) : (
                            <span className="inline-flex w-full text-center text-5xl font-medium">
                                <p className="text-[--gray-11]">We are currently&nbsp;</p>
                                <p>closed</p>
                            </span>
                        )}
                    </Flex>
                </Flex>
                <Flex height="100%" width="100%" position="absolute" justify="center" align="center" zIndex="0">
                    <img src={idcSilhouette} alt="IDC Silhouette" className="opacity-10" />
                </Flex>
            </Flex>
        </>
    );
}
