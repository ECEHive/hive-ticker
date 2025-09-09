import { useCallback, useEffect, useState } from "react";

export default function useLiveSpaceData(target, refreshInterval = 60000, processData = null) {
    const [fetchedData, setData] = useState(null);

    const fetchData = useCallback(async () => {
        fetch(`https://api.hive.lemony.click/${target}?batch=1`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let processedData = processData ? processData(data) : data;
                if (JSON.stringify(processedData) === JSON.stringify(fetchedData)) return;
                setData(processedData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [fetchedData, target, processData]);

    useEffect(() => {
        let interval = setInterval(() => {
            fetchData();
        }, refreshInterval);

        fetchData();

        return () => {
            clearInterval(interval);
        };
    }, [fetchData, refreshInterval]);

    return fetchedData;
}
