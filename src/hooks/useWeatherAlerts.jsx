import { useState, useEffect } from 'react';

export default function useWeatherAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherAlerts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.weather.gov/alerts/active/zone/GAC121`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch weather alerts');
                }

                const data = await response.json();
                setAlerts(data.features || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherAlerts();

        const interval = setInterval(fetchWeatherAlerts, 60000); // Refresh every 60 seconds
        return () => clearInterval(interval);
    }, []);

    return { alerts, loading, error };
};
