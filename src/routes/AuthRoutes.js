
import { Ecommerce, Login } from "../pages";

const AuthRoutes = {
    path: '/',
    children: [
        {
          path: "login",
          element: <Login />,
        },
        // {
        //   path: "register",
        //   element: <RegisterPage />,
        // },
        // {
        //   path: "verifyemail",
        //   element: <EmailVerificationPage />,
        //   children: [
        //     {
        //       path: ":verificationCode",
        //       element: <EmailVerificationPage />,
        //     },
        //   ],
        // },
        // {
        //   path: "forgotpassword",
        //   element: <ForgotPasswordPage />,
        // },
        // {
        //   path: "resetpassword/:resetCode",
        //   element: <ResetPasswordPage />,
        // },
    ],
};

export default AuthRoutes;