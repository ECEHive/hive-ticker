import TextTransition from "react-text-transition";
import useTime from "../hooks/useTime";

const digitMap = [
    (time) => (time[0] === "0" ? "" : time[0]),
    (time) => (time[1]),
    () => ":",
    (time) => (time[3]),
    (time) => (time[4]),
]

export default function Clock({}) {
    const {time} = useTime();

    return (
        <div className="min-w-full min-h-full h-full">
            <div className="flex flex-col items-center justify-center gap-10 h-full w-full" >
                <div className="flex flex-row items-end h-auto">
                    {digitMap.map((digit, index) => {
                        return (
                            <p
                                style={{
                                    fontFamily: "Rubik Doodle Shadow",
                                    fontSize: "250px",
                                    fontWeight: 400,
                                    lineHeight: 0.8,
                                }}
                                key={index}
                            >
                                <TextTransition
                                    inline
                                    delay={(digitMap.length - index) * 100}
                                >
                                    {digit(time[0])}
                                </TextTransition>
                            </p>
                        );
                    })}
                    <p style={{ fontFamily: "Rubik Doodle Shadow", fontSize: "50px", lineHeight: 1 }}>
                        {time[1]}
                    </p>
                </div>
            </div>
        </div>
    );
}
