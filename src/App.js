import React, { useEffect,useState, Suspense, lazy} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import PublicRoutes from "./Utils/PublicRoute";
import PrivateRouter from "./Utils/PrivateRoute";
import "./App.css";
import { getToken, removeUserSession, setUserSession } from './Utils/Common'; 
const ListSpokesman = lazy(() => import('./pages/ListSpokesman'));
const ListResidentReporter = lazy(() => import('./pages/ListResidentReporter'));
const Page_404 = lazy(() => import('./pages/Page_404'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const EnterCode = lazy(() => import('./pages/EnterCode'));
const EnterMail = lazy(() => import('./pages/EnterMail'));
const Login = lazy(() => import('./pages/Login'));
const ListUnitsCqnn = lazy(() => import('./pages/ListUnitsCqnn'));
const ListUnits = lazy(() => import('./pages/ListUnits'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Calendar = lazy(() => import('./pages/Calendar'));
const ListReporter = lazy(() => import('./pages/ListReporter'));
const PopupNoti = lazy(() => import('./pages/PopupNoti'));
function useViewport() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};
const loading = (
  <div className="w-screen h-screen flex items-center justify-center space-x-2">
  <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
  <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
  <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
</div>
)
const App = () => {
  const viewPort = useViewport();
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const token = getToken();
    if (token) {
      setUserSession(token);
      setAuthLoading(false);
    } else {
      removeUserSession();
      setAuthLoading(false);
    } 
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400">Checking Authentication...</div>
  }

  const isMobile = viewPort.width <= 1024;
  if (isMobile) {
    return <PopupNoti/>
  } else {
    return (
      <BrowserRouter>     
        <Suspense fallback={loading}>
          <Routes>
              <Route element={<PublicRoutes/>}>
                <Route path="/" element={<Login />} />
                <Route path="/dang-nhap" element={<Login/>}/>
                <Route path="/nhap-mail" element={<EnterMail/>}/>
                <Route path="/nhap-code" element={<EnterCode/>}/>
                <Route path="/quen-mat-khau" element={<ForgotPassword/>}/>
              </Route>
              <Route element={<PrivateRouter/>}>
                {/* pages  */}
                <Route path="/thong-tin-nguoi-dung" element={<UserProfile />} />
                {/* List */}
                <Route path="/danh-sach-nguoi-dung" element={<ListReporter />} />
                <Route path="/danh-sach-don-vi-bao-chi" element={<ListUnits />} />
                <Route path="/danh-sach-co-quan-nha-nuoc" element={<ListUnitsCqnn />} />
                <Route path="/danh-sach-nguoi-phat-ngon" element={<ListSpokesman />} />
                <Route path="/danh-sach-phong-vien-thuong-tru" element={<ListResidentReporter />} />
                {/* apps  */}
                <Route path="/lich" element={<Calendar />} />
              </Route>
              <Route path="*" element={<Page_404/>} />
          </Routes>
      </Suspense>
    </BrowserRouter>
  );
  }
};

export default App;
