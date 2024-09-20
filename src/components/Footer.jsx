import logo from "../assets/hive_logo_onDark.svg";
import useTime from "../hooks/useTime";


export default function Footer({}) {
    const {date} = useTime();

    return (
        <>
            <div className="w-full h-full flex flex-row justify-between items-center gap-10 p-4">
                <img src={logo} alt='Hive Logo' className="h-3/4" />
                <p className="text-lg font-medium">
                    {date}
                </p>
            </div>
        </>
    );
}
