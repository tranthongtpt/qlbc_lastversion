
import QRCode from "../data/qrcode.png"
function Popup() {
    return (
        <>
            <div className="flex justify-center flex-col h-screen from-red-100 via-red-300 to-blue-500 bg-gradient-to-br">
                <h1 className="uppercase text-2xl font-bold">chúng tôi có hỗ trợ phiên bản moblie dành cho người dùng</h1>
                <div className="p-4 w-[500px] rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
                        <img className="mx-auto w-full block rounded-lg" alt="art cover" loading="lazy" src={QRCode} />
                    </div>
            </div>
        </>
    );
}

export default Popup;