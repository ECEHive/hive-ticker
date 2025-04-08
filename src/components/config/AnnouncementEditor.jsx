import { Flex } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import useInfo from "../../hooks/useInfo";
import useTheme from "../../hooks/useTheme";

export default function AnnouncementEditor({}) {
    const { infoSlides, createSlide, updateSlide, deleteSlide } = useInfo();
    const { colorTheme } = useTheme();

    const [showSlidePreview, setShowSlidePreview] = useState(false);
    const [selectedSlideIndex, setSelectedSlideIndex] = useState(-1);
    const [selectedSlide, setSelectedSlide] = useState({});

    const saveSlide = useCallback(() => {
        const payload = {
            ...selectedSlide,
            timestamp: dayjs(),
        };
        updateSlide(selectedSlideIndex, payload);
    }, [selectedSlide, selectedSlideIndex, updateSlide]);

    const removeSlide = useCallback(() => {
        setSelectedSlide({
            title: "",
            content: "",
            enabled: false,
            timestamp: "",
        });
        setSelectedSlideIndex(0);
        deleteSlide(selectedSlideIndex);
        console.log(infoSlides);
    }, [deleteSlide, selectedSlideIndex, infoSlides]);

    return (
        <Flex direction="column" gap="2" width="100%" height="100%" align="center" p="1">
            <p>Announcements synced with Airtable</p>
        </Flex>
    );
}
