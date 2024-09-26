import { EyeNoneIcon, EyeOpenIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, RadioCards, ScrollArea, Switch, Text, TextArea, TextField } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useInfo from "../../hooks/useInfo";

export default function AnnouncementEditor({}) {
    const { infoSlides, createSlide, updateSlide, deleteSlide } = useInfo();

    const [showSlidePreview, setShowSlidePreview] = useState(false);
    const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
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
        setSelectedSlideIndex(-1);
        deleteSlide(selectedSlideIndex);
        console.log(infoSlides);
    }, [deleteSlide, selectedSlideIndex, infoSlides]);

    return (
        <Flex direction="column" gap="2" width="100%" height="100%">
            <Flex direction="row" gap="2" width="100%" height="100%" flexGrow="1" justify="center" align="stretch">
                <Flex direction="column" className="w-1/3" justify="start" align="center" gap="4">
                    <ScrollArea scrollbars="vertical" type="always" className="h-full max-h-full w-full">
                        <RadioCards.Root
                            defaultValue="0"
                            columns="1"
                            onValueChange={(value) => {
                                setSelectedSlideIndex(value);
                                setSelectedSlide(infoSlides[value]);
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

                <Flex direction="column" className="min-h-full w-2/3" gap="4">
                    <Flex direction="row" justify="between" align="center" gap="4">
                        <Flex direction="row" align="center" gap="2">
                            <Switch
                                radius="small"
                                checked={selectedSlide?.enabled}
                                onCheckedChange={(checked) =>
                                    setSelectedSlide({
                                        ...selectedSlide,
                                        enabled: checked,
                                    })
                                }
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
                        placeholder="Announcement name"
                        value={selectedSlide?.title}
                        onChange={(e) =>
                            setSelectedSlide({
                                ...selectedSlide,
                                title: e.target.value,
                            })
                        }
                    />
                    {showSlidePreview ? (
                        <Markdown
                            className="prose prose-lg prose-neutral prose-invert h-auto w-full flex-grow overflow-auto px-2 prose-headings:font-bold"
                            remarkPlugins={[remarkGfm]}
                        >
                            {selectedSlide?.content}
                        </Markdown>
                    ) : (
                        <TextArea
                            placeholder="Write some markdown..."
                            className="h-auto flex-grow"
                            value={selectedSlide?.content}
                            onChange={(e) =>
                                setSelectedSlide({
                                    ...selectedSlide,
                                    content: e.target.value,
                                })
                            }
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
                        <Button
                            onClick={saveSlide}
                            disabled={
                                // disable if everything between the edited and saved slide is the same except timestamp
                                selectedSlide.title === infoSlides[selectedSlideIndex]?.title &&
                                selectedSlide.content === infoSlides[selectedSlideIndex]?.content &&
                                selectedSlide.enabled === infoSlides[selectedSlideIndex]?.enabled
                            }
                        >
                            Save announcement
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
