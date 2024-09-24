import { Box } from "@radix-ui/themes";
import { useCallback, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { animateScroll, Element } from "react-scroll";
import remarkGfm from "remark-gfm";

const fancyMd = `
    # Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](/image/sample.webp "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`
let message = 'Hello world';
alert(message);
\`\`\`

## Inline code

This web site is using \`markedjs/marked\`.


`;
const markdown = `## Welcome to The HIVE!

### Fall 2024 hours

| |  |
| --- | --- |
| Monday - Friday | 10am-6pm |
| Sat - Sun | Closed |

### Reminders
- Wear safety googles when soldering
- Clean up your workspace before you leave
- yadda yadda yadda

*Need help? Find a PI!*
`;

export default function Notices({}) {
    const mdRef = useRef(null);
    const boxRef = useRef(null);

    const scrollSpeed = 20; //pixels per second

    const runScroll = useCallback((duration, fastDuration) => {
        animateScroll.scrollToBottom({
            duration: duration,
            delay: 0,
            smooth: "linear",
            spy: true,
            containerId: "container",
        });

        setTimeout(() => {
            animateScroll.scrollToTop({
                duration: fastDuration,
                delay: 0,
                smooth: "linear",
                spy: true,
                containerId: "container",
            });
        }, duration + 5000);
    }, []);

    useEffect(() => {
        const rect = mdRef?.current?.getBoundingClientRect();
        const duration =
            (rect.y - boxRef.current.clientHeight) / (scrollSpeed / 1000);
        const fastDuration = duration / 6;

        runScroll(duration, fastDuration);

        const interval = setInterval(
            () => {
                runScroll(duration, fastDuration);
            },
            duration + 5000 + fastDuration + 5000,
        );

        return () => clearInterval(interval);
    }, [runScroll]);

    return (
        <Box
            width="100%"
            height="100%"
            maxWidth="100%"
            maxHeight="100%"
            overflow="hidden"
            ref={boxRef}
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
                    className="prose prose-2xl prose-neutral prose-invert prose-headings:font-bold"
                    remarkPlugins={[remarkGfm]}
                >
                    {markdown}
                </Markdown>
                <div name="bottom" ref={mdRef} />
            </Element>
            {/* <div name="bottom" className="h-0" ref={mdRef} /> */}
        </Box>
    );
}
