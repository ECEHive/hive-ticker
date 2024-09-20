import Clock from "./components/Clock";
import Footer from "./components/Footer";

export default function Dashboard({}) {
    return (
        <div className='max-w-screen max-h-screen min-w-screen min-h-screen w-screen h-screen'>
            <div className='flex flex-col justify-center align-center h-full min-h-full min-w-full'>
                <div className="w-full h-full flex-grow">
                    <Clock />
                </div>
                <div className='w-full h-20'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}