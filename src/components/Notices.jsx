import { Box } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { animateScroll, Element } from "react-scroll";
import remarkGfm from "remark-gfm";

const markdown = `# Welcome to The HIVE!
 
i was thinking we can have general announcements and info up here and have it cycle through

it supports **markdown**, and you can even include images
![image](https://empathybytes.library.gatech.edu/sites/default/files/2023-04/hive-exterior%20%281%29.jpg)

and tables
| like | this |
|------|------|
| 1    | 2    |
`;

export default function Notices({}) {
    const mdRef = useRef(null);
    const boxRef = useRef(null);

    const scrollSpeed = 10;

    useEffect(() => {
        console.log("go");
        const duration = (boxRef.current.clientHeight / scrollSpeed) * 1000;

        animateScroll.scrollToBottom({
            // convert scrollSpeed from pixels to second to milliseconds
            duration: duration,
            delay: 0,
            smooth: "linear",
            spy: true,
            containerId: "container",
        });

        setTimeout(() => {
            animateScroll.scrollToTop({
                duration: 0,
                delay: 0,
                smooth: "linear",
                spy: true,
                containerId: "container",
            });
        }, duration + 5000);
    }, []);

    return (
        <Box
            width="100%"
            height="100%"
            maxWidth="100%"
            maxHeight="100%"
            ref={boxRef}
            overflow="hidden"
        >
            <Element
                name="container"
                id="container"
                style={{
                    height: "100%",
                    width: "100%",
                    overflow: "auto",
                    padding: "48px",
                }}
            >
                <Markdown
                    className="prose prose-invert prose-neutral prose-2xl prose-headings:font-bold"
                    remarkPlugins={[remarkGfm]}
                >
                    {markdown}
                </Markdown>
                <Element name="bottom" />
            </Element>
            {/* <div name="bottom" className="h-0" ref={mdRef} /> */}
        </Box>
    );
}
