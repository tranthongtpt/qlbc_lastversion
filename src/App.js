import React, { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route, Redirect, withRouter} from "react-router-dom";
import PublicRoutes from "./Utils/PublicRoute";
import PrivateRouter from "./Utils/PrivateRoute";
import {
  ListReporter,
  Calendar,
  UserProfile,
  ListUnits,
  ListUnitsCqnn,
  Login,
  EnterMail,
  EnterCode,
  ForgotPassword,
  ListSpokesman,
  ListResidentReporter,
  Page_404
} from "./pages";
import "./App.css";
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import { NotifyProfile } from "./components";

const App = () => {

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

  return (
    <BrowserRouter>     
      <Routes>
          <Route element={<PublicRoutes/>}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/entermail" element={<EnterMail/>}/>
            <Route path="/entercode" element={<EnterCode/>}/>
            <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          </Route>

          <Route element={<PrivateRouter/>}>
            {/* <Route path="/bangdieukhien" element={<Ecommerce />} /> */}
            {/* pages  */}
            <Route path="/userprofile" element={<UserProfile />} />
            {/* List */}
            <Route path="/listreporter" element={<ListReporter />} />
            <Route path="/listunits" element={<ListUnits />} />
            <Route path="/listspokesman" element={<ListSpokesman />} />
            <Route path="/listresidentreporter" element={<ListResidentReporter />} />
            {/* apps  */}
            <Route path="/calendar" element={<Calendar />} />
          </Route>
          <Route path="*" element={<Page_404/>} />
      </Routes>
  </BrowserRouter>
  );
};

export default App;
