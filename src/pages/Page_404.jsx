import { useNavigate } from "react-router-dom";
import Button from '@material-ui/core/Button'
import { DocumentTitle } from "../components";
function Page_404() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/danh-sach-nguoi-dung')
    }
    return (
        <>
            <DocumentTitle title='Trang không tồn tại'/>
            <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
                <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
                <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute mt-[-120px]">
                    Page Not Found
                </div>
                <div className="mt-5">
                    <p className="text-2xl font-semibold md:text-3xl text-white">Xin lỗi, chúng tôi không thể tìm thấy trang này.</p>
                    <p className="mt-4 mb-8 dark:text-gray-400 text-white">Nhưng đừng lo lắng, bạn có thể tìm thấy rất nhiều thứ khác trên trang chủ của chúng tôi.</p>
                </div>
                <button className="mt-5">
                    <a
                        className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                    >
                        <span
                            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
                        ></span>

                        <span className="relative block px-8 py-3 bg-[#fff] border border-current">
                            <Button onClick={handleBack}>Quay trở lại</Button>
                        </span>
                    </a>
                </button>
            </div>
        </>
    );
}

export default Page_404;