import useTime from "../hooks/useTime";

export default function Footer({}) {
    const { date } = useTime();

    return (
        <>
            <div className="flex h-full w-full flex-row items-center justify-between gap-10 bg-neutral-900 p-4">
                <div className="flex h-full w-auto flex-row items-center justify-start gap-4">
                    <img
                        src="https://i.scdn.co/image/ab67616d0000b273347805deb1aba0a66d0a9a09"
                        alt="Hive Logo"
                        className="h-full"
                    />

                    <div className="flex flex-col items-start justify-center gap-2">
                        <p className="text-6xl font-bold">Magpie</p>
                        <p className="text-2xl text-gray-300">Peach Pit</p>
                    </div>
                </div>
            </div>
        </>
    );
}
