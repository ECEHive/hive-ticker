import React from 'react';
import useWeatherAlerts from '../hooks/useWeatherAlerts';
import { Box } from "@radix-ui/themes";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "motion/react";

const WeatherAlerts = () => {
    const { alerts } = useWeatherAlerts();

    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [alerts.length]);

    if (!alerts || alerts.length === 0) {
        return null;
    }

    return (
        <Box
            height="auto"
            width="100%"
            className="border-b-[3px] border-solid border-[--sand-7] bg-red-800 text-red-100 text-5xl px-8 py-4 font-bold"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={alerts[currentAlertIndex].properties.event}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="font-bold">
                        {alerts[currentAlertIndex].properties.event} until {new Date(alerts[currentAlertIndex].properties.expires).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </span>
                </motion.div>
            </AnimatePresence>
        </Box>
    );
};

export default WeatherAlerts;