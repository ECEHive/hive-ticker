import { Badge, Flex, Grid } from "@radix-ui/themes";
// import Workshops from "./components/specialSlides/Workshops";

// import Workshops from "./components/specialSlides/Workshops";
import { motion } from "motion/react";
import { useEffect } from "react";
import useLiveSpaceData from "../../hooks/useLiveSpaceData";

import dayjs from "dayjs";
import bambuLogo from "../../assets/printing/bambu.svg";
import formlabsLogo from "../../assets/printing/formlabs.svg";
import SpecialSlideTemplate from "./Template";

export default function Printers() {
    const printerStates = useLiveSpaceData("getPrinters", 60000, (data) => {
        let result = {
            printers: data[0]?.result?.data?.json || [],
        };

        result.printers.forEach((printer) => {
            printer.logo = getPrinterImage(printer.model);

            if (printer.model.toLowerCase().includes("formlabs")) {
                printer.shortModel = printer.model.replace("Formlabs ", "");
            } else if (printer.model.toLowerCase().includes("bambu")) {
                printer.shortModel = printer.model.replace("Bambu Lab", "");
            }
        });

        // group printers by model
        let byModel = {};
        result.printers.forEach((printer) => {
            if (!byModel[printer.model]) byModel[printer.model] = [];
            byModel[printer.model].push(printer);
        });
        result.byModel = byModel;

        return result;
    });

    useEffect(() => {
        console.log(printerStates);
    }, [printerStates]);

    const getPrinterImage = (model) => {
        if (model.toLowerCase().includes("formlabs")) return formlabsLogo;
        else if (model.toLowerCase().includes("bambu")) return bambuLogo;
        else return null;
    };

    return (
        <SpecialSlideTemplate title="3D Printing Queues">
            <Grid className="" width="100%" gap="4" height="100%" columns="3" rows="auto">
                {printerStates &&
                    printerStates.printers.map((printer, index) => {
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-start justify-start gap-5 bg-zinc-800 p-5"
                            >
                                <Flex direction="column" gap="4" width="100%">
                                    <Flex direction="row" justify="between" align="start" width="100%" gap="3">
                                        <span className="self-center text-[2.3rem] leading-none">
                                            {printer.printerCount > 1 && (
                                                <p className="font-semibold text-[--gray-11]">
                                                    {printer.printerCount}x
                                                </p>
                                            )}
                                            <p className="font-bold">{printer.name}</p>
                                        </span>
                                        <Badge color="gray" variant="outline" size="3" className="font-mono text-xl">
                                            {printer.material}
                                        </Badge>
                                    </Flex>

                                    <Flex direction="row" justify="start" align="end" width="100%">
                                        <Flex direction="row" justify="between" width="100%" align="center">
                                            <span className="inline-flex items-center">
                                                <img
                                                    src={printer.logo}
                                                    alt="Formlabs logo"
                                                    className="inline h-5 w-auto brightness-0 grayscale invert"
                                                />
                                                &nbsp;&nbsp;&nbsp;
                                                <p className="text-2xl font-semibold leading-none">
                                                    {printer.shortModel}
                                                </p>
                                            </span>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                {printer.queueLength > 0 ? (
                                    <Flex
                                        direction="row"
                                        justify="center"
                                        align="end"
                                        width="100%"
                                        height="100%"
                                        flexGrow="1"
                                    >
                                        <Flex direction="column" justify="start" align="start" gap="1" width="50%">
                                            <p className="text-center font-mono text-6xl font-semibold">
                                                {printer.queueLength}
                                            </p>
                                            <Flex direction="row" justify="start" align="center" width="100%">
                                                <p className="text-2xl text-[--gray-11]">
                                                    Print{printer.queueLength > 1 ? "s" : ""} queued
                                                </p>
                                            </Flex>
                                        </Flex>

                                        <Flex direction="column" justify="start" align="start" gap="1" width="50%">
                                            <span className="inline-flex text-center text-6xl font-semibold">
                                                <p className="font-mono">
                                                    {dayjs.duration(printer.queueTime, "seconds").format("H")}
                                                </p>
                                                :
                                                <p className="font-mono">
                                                    {dayjs.duration(printer.queueTime, "seconds").format("mm")}
                                                </p>
                                            </span>
                                            <Flex direction="row" justify="start" align="center" width="100%">
                                                <p className="text-2xl text-[--gray-11]">Time till your print</p>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                ) : (
                                    <Flex
                                        direction="row"
                                        justify="center"
                                        align="center"
                                        width="100%"
                                        height="100%"
                                        flexGrow="1"
                                    >
                                        <p className="text-4xl font-medium text-[--gray-8]">No prints queued</p>
                                    </Flex>
                                )}
                            </motion.div>
                        );
                    })}
                {printerStates?.printers.length > 0 && (
                    <motion.div
                        className="grid-flow-row bg-zinc-800 p-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-4xl font-medium">
                            Queue times are estimates and are not guaranteed.
                            <br />
                            <br />
                            Ask a PI for help adding your print to the queue!
                        </p>
                    </motion.div>
                )}
            </Grid>
        </SpecialSlideTemplate>
    );
}
