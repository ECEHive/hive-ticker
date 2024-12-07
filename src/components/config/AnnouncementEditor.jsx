import { Editor } from "@monaco-editor/react";
import { EyeNoneIcon, EyeOpenIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, RadioCards, ScrollArea, Switch, Text, TextField } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
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
        <Flex direction="column" gap="2" width="100%" height="100%" p="1">
            <Flex direction="row" gap="2" width="100%" height="100%" flexGrow="1" justify="start" align="stretch">
                <Flex direction="column" className="w-1/3" justify="start" align="center" gap="4">
                    <ScrollArea scrollbars="vertical" type="always" className="h-full max-h-full w-full">
                        <RadioCards.Root
                            defaultValue="0"
                            columns="1"
                            onValueChange={(index) => {
                                // if (selectedSlideIndex !== index && index !== -1) saveSlide();
                                setSelectedSlideIndex(index);
                                setSelectedSlide(infoSlides[index]);
                            }}
                            gap="2"
                            className="pr-3"
                        >
                            {infoSlides &&
                                infoSlides.map((slide, index) => (
                                    <RadioCards.Item value={index} key={index}>
                                        <Flex direction="column" width="100%">
                                            <Flex direction="row" justify="start" align="center" gap="1">
                                                {slide.enabled ? <EyeOpenIcon /> : <EyeNoneIcon />}
                                                <Text weight="bold">{slide.title}</Text>
                                            </Flex>
                                            <Text>
                                                edited{" "}
                                                {dayjs.duration(dayjs(slide.timestamp).diff(dayjs())).humanize(true)}
                                            </Text>
                                        </Flex>
                                    </RadioCards.Item>
                                ))}
                        </RadioCards.Root>
                    </ScrollArea>
                    <Flex direction="row" gap="2" width="100%" justify="center">
                        <Button size="2" onClick={createSlide}>
                            <PlusIcon />
                            Create announcement
                        </Button>
                    </Flex>
                </Flex>

                {Object.keys(selectedSlide).length > 0 && (
                    <Flex direction="column" className="min-h-full w-2/3" gap="3">
                        <Flex direction="row" justify="between" align="center" gap="4">
                            <Flex direction="row" align="center" gap="2">
                                <Switch
                                    radius="small"
                                    checked={selectedSlide?.enabled}
                                    onCheckedChange={(checked) => {
                                        setSelectedSlide({
                                            ...selectedSlide,
                                            enabled: checked,
                                        });
                                        updateSlide(selectedSlideIndex, {
                                            ...infoSlides[selectedSlideIndex],
                                            enabled: checked,
                                            timestamp: dayjs(),
                                        });
                                    }}
                                />
                                <Text size="2">Enable slide</Text>
                            </Flex>
                            <AlertDialog.Root>
                                <AlertDialog.Trigger>
                                    <Button color="red">
                                        <TrashIcon />
                                        Delete
                                    </Button>
                                </AlertDialog.Trigger>
                                <AlertDialog.Content maxWidth="450px">
                                    <AlertDialog.Title>Delete announcement</AlertDialog.Title>
                                    <AlertDialog.Description size="2">Are you sure?</AlertDialog.Description>

                                    <Flex gap="3" mt="4" justify="end">
                                        <AlertDialog.Cancel>
                                            <Button variant="soft" color="gray">
                                                Cancel
                                            </Button>
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action>
                                            <Button variant="solid" color="red" onClick={removeSlide}>
                                                Delete
                                            </Button>
                                        </AlertDialog.Action>
                                    </Flex>
                                </AlertDialog.Content>
                            </AlertDialog.Root>
                        </Flex>
                        <TextField.Root
                            size="2"
                            className="min-h-[30px]"
                            placeholder="Announcement name"
                            value={selectedSlide?.title}
                            onChange={(e) => {
                                setSelectedSlide({
                                    ...selectedSlide,
                                    title: e.target.value,
                                });
                                updateSlide(selectedSlideIndex, {
                                    ...infoSlides[selectedSlideIndex],
                                    title: e.target.value,
                                    timestamp: dayjs(),
                                });
                            }}
                        />
                        {showSlidePreview ? (
                            <Markdown
                                className={`prose prose-lg prose-neutral ${colorTheme === "dark" && "prose-invert"} h-auto w-full flex-grow overflow-auto px-2 prose-headings:font-bold`}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {selectedSlide?.content}
                            </Markdown>
                        ) : (
                            <Editor
                                className="w-full flex-grow"
                                value={selectedSlide?.content}
                                options={{
                                    wordWrap: true,
                                    minimap: {
                                        enabled: false,
                                    },
                                }}
                                onChange={(v, e) => {
                                    setSelectedSlide({
                                        ...selectedSlide,
                                        content: v,
                                    });
                                    updateSlide(selectedSlideIndex, {
                                        ...infoSlides[selectedSlideIndex],
                                        content: v,
                                        timestamp: dayjs(),
                                    });
                                }}
                                defaultLanguage="html"
                                theme="vs-dark"
                            />
                        )}
                        <Flex gap="3" justify="between">
                            <Flex direction="row" gap="2" justify="center" align="center">
                                <Switch
                                    radius="small"
                                    checked={showSlidePreview}
                                    onCheckedChange={(checked) => setShowSlidePreview(checked)}
                                ></Switch>
                                <Text size="2">Preview</Text>
                            </Flex>
                            {/* <Button
                                onClick={saveSlide}
                                disabled={
                                    // disable if everything between the edited and saved slide is the same except timestamp
                                    selectedSlide.title === infoSlides[selectedSlideIndex]?.title &&
                                    selectedSlide.content === infoSlides[selectedSlideIndex]?.content &&
                                    selectedSlide.enabled === infoSlides[selectedSlideIndex]?.enabled
                                }
                            >
                                Save announcement
                            </Button> */}
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
}
