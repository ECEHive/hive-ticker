import { useLocalStorage } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { createContext, useCallback } from "react";
const InfoContext = createContext();

function InfoProvider({ children }) {
    const [infoSlides, setInfoSlides] = useLocalStorage("info-slides", [
        {
            title: "Welcome",
            timestamp: dayjs(),
            enabled: true,
            content: `# Welcome to The HIVE!`,
        },
    ]);

    const createSlide = useCallback(() => {
        const newSlide = {
            title: "New Slide",
            timestamp: dayjs(),
            content: `# New Slide`,
            enabled: false,
        };
        setInfoSlides([...infoSlides, newSlide]);
    }, [infoSlides, setInfoSlides]);

    const updateSlide = useCallback(
        (index, newSlide) => {
            const newSlides = [...infoSlides];
            newSlides[index] = newSlide;
            setInfoSlides(newSlides);
        },
        [infoSlides, setInfoSlides],
    );

    const deleteSlide = useCallback(
        (index) => {
            const newSlides = [...infoSlides];
            newSlides.splice(index, 1);
            setInfoSlides(newSlides);
        },
        [infoSlides, setInfoSlides],
    );

    return (
        <InfoContext.Provider value={{ infoSlides, createSlide, updateSlide, deleteSlide }}>
            {children}
        </InfoContext.Provider>
    );
}

InfoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { InfoContext, InfoProvider };
