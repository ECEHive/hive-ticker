import Clock from "./components/Clock";
import Footer from "./components/Footer";

export default function Dashboard({}) {
    return (
        <div className="max-w-screen min-w-screen h-screen max-h-screen min-h-screen w-screen">
            <div className="align-center flex h-full min-h-full min-w-full flex-col justify-center">
                <div className="h-full w-full flex-grow">
                    <Clock />
                </div>
                <div className="h-48 w-full">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
