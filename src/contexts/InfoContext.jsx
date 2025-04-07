import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";

const InfoContext = createContext();

function InfoProvider({ children }) {
    const [infoSlides, setInfoSlides] = useState([]);

    const fetchInfoSlides = useCallback(async () => {
        fetch("https://n8n.lemmony.click/webhook/ticker-slides")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                let result = data[0].data.map((record) => {
                    return {
                        title: record.Title,
                        timestamp: "",
                        content: record.Content,
                        enabled: record.Enabled,
                    };
                });
                if (JSON.stringify(result) === JSON.stringify(infoSlides)) return;
                setInfoSlides(result);
            })
            .catch((error) => {
                console.error("Error fetching info slides:", error);
            });
    }, [infoSlides]);

    useEffect(() => {
        let interval = setInterval(() => {
            fetchInfoSlides();
        }, 60000);

        fetchInfoSlides();

        return () => {
            clearInterval(interval);
        };
    }, [fetchInfoSlides]);

    return <InfoContext.Provider value={{ infoSlides }}>{children}</InfoContext.Provider>;
}

InfoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { InfoContext, InfoProvider };
