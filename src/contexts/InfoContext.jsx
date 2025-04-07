import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import base from "../utils/airtable";

const InfoContext = createContext();

function InfoProvider({ children }) {
    const [infoSlides, setInfoSlides] = useState([]);

    async function fetchInfoSlides() {
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

                setInfoSlides(result);
            });
    }

    useEffect(() => {
        fetchInfoSlides();
    }, []);

    return <InfoContext.Provider value={{ infoSlides }}>{children}</InfoContext.Provider>;
}

InfoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { InfoContext, InfoProvider };
