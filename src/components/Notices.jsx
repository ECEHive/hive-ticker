import { Box } from "@radix-ui/themes";
import { motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import { animateScroll, Element } from "react-scroll";
import remarkGfm from "remark-gfm";
import useInfo from "../hooks/useInfo";

export default function Notices({}) {
    const { infoSlides } = useInfo();

    const mdRef = useRef(null);
    const boxRef = useRef(null);

    const [currentSlide, setCurrentSlide] = useState(``);
    const animationControls = useAnimationControls();
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
                const duration =
                    rect.y > boxRef.current.clientHeight
                        ? (rect.y - boxRef.current.clientHeight) /
                          (scrollSpeed / 1000)
                        : 5000;
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
                duration: 0,
                delay: 0,
                smooth: "linear",
                spy: true,
                containerId: "container",
            });

            loadSlide(slidesFiltered[currentSlideIndex.current].content);
            ready = false;
            runSlide().then(() => {
                console.log("resolved");
                currentSlideIndex.current =
                    (currentSlideIndex.current + 1) % slidesFiltered.length;
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
            width="100%"
            height="100%"
            maxWidth="100%"
            maxHeight="100%"
            overflow="hidden"
            ref={boxRef}
        >
            <motion.div
                // fade the div when currentSlide changes
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={currentSlide}
                className="h-full max-h-full w-full max-w-full"
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
                        {currentSlide}
                    </Markdown>
                    <div name="bottom" ref={mdRef} />
                </Element>
            </motion.div>
        </Box>
    );
}
