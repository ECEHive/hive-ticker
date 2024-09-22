import { Box } from "@radix-ui/themes";
import Markdown from "react-markdown";

const markdown = `
# Upcoming events

- list
- of 
- stuff
`;

export default function Notices({}) {
    return (
        <Box height="100%" maxWidth="100%" maxHeight="100%" p="8">
            <Markdown className="prose-invert prose-neutral prose-2xl prose-headings:font-bold">
                {markdown}
            </Markdown>
        </Box>
    );
}
