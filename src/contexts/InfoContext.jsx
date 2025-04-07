import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import base from "../utils/airtable";

const InfoContext = createContext();

function InfoProvider({ children }) {
    const [infoSlides, setInfoSlides] = useState([]);

    const fetchInfoSlides = useCallback(async () => {
        return base("Slides")
            .select({
                // Selecting the first 3 records in Grid view:
                view: "Grid view",
            })
            .all()
            .then((records) => {
                let result = records.map((record) => {
                    return {
                        title: record.get("Title"),
                        timestamp: "",
                        content: record.get("Content"),
                        enabled: record.get("Enabled"),
                    };
                });
                if (JSON.stringify(result) === JSON.stringify(infoSlides)) return;
                setInfoSlides(result);
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
