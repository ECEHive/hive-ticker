import { Box } from "@radix-ui/themes";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import { animateScroll, Element } from "react-scroll";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import useInfo from "../hooks/useInfo";
import useTheme from "../hooks/useTheme";

export default function Notices({}) {
    const { infoSlides } = useInfo();
    const { colorTheme } = useTheme();

    const mdRef = useRef(null);
    const boxRef = useRef(null);

    const [currentSlide, setCurrentSlide] = useState(``);
    const currentSlideIndex = useRef(0);

    const slidesFiltered = useMemo(() => {
        console.log("slides changed");
        return infoSlides.filter((slide) => slide.enabled);
    }, [infoSlides]);

    const scrollSpeed = 20; //pixels per second
    const timePadding = 2500;

    const runScroll = useCallback((duration) => {
        animateScroll.scrollToBottom({
            duration: duration,
            delay: 0,
            smooth: "linear",
            spy: true,
            containerId: "container",
        });
    }, []);

    const runSlide = useCallback(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const rect = mdRef?.current?.getBoundingClientRect();
                const duration = Math.max(
                    rect?.y > boxRef.current.clientHeight
                        ? (rect.y - boxRef.current.clientHeight) / (scrollSpeed / 1000)
                        : 5000,
                    5000,
                );
                runScroll(duration);
                setTimeout(() => {
                    resolve();
                }, duration + timePadding);
            }, timePadding);
        });
    }, [runScroll]);

    const loadSlide = useCallback((content) => {
        setCurrentSlide(content);
    }, []);

    useEffect(() => {
        console.log("effect");
        currentSlideIndex.current = 0;
        loadSlide("");

        let ready = true;
        const interval = setInterval(() => {
            if (!ready) return;
            if (currentSlideIndex.current >= slidesFiltered.length) {
                currentSlideIndex.current = 0;
            }
            animateScroll.scrollToTop({
                duration: 750,
                delay: 0,
                smooth: true,
                spy: true,
                containerId: "container",
            });

            loadSlide(slidesFiltered[currentSlideIndex.current]?.content);
            ready = false;
            runSlide().then(() => {
                console.log("resolved");
                currentSlideIndex.current = (currentSlideIndex.current + 1) % slidesFiltered.length;
                ready = true;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            console.log("clear");
        };
    }, [runSlide, slidesFiltered, loadSlide]);

    return (
        <Box
            minWidth="100%"
            height="100%"
            maxWidth="100%"
            maxHeight="100%"
            overflow="visible"
            p="7"
            ref={boxRef}

            // style={{
            //     maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
            // }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    // fade the div when currentSlide changes
                    key={currentSlide || "empty"}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full max-h-full w-full max-w-full"
                >
                    <Element
                        name="container"
                        id="container"
                        style={{
                            height: "100%",
                            width: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <Markdown
                            className={`prose prose-2xl prose-neutral ${colorTheme === "dark" && "prose-invert"} overflow-hidden`}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        >
                            {currentSlide}
                        </Markdown>
                        <div name="bottom" ref={mdRef} />
                    </Element>
                </motion.div>
            </AnimatePresence>
        </Box>
    );
}
