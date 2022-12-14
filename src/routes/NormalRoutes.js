
import { Ecommerce, Login } from "../pages";
import { useRoutes,RouteObject } from 'react-router-dom';

const NormalRoutes = {
    path: '/',
    // element: ,
    children: [
        {
            path: '/',
            element: <Ecommerce />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'bangdieukhien',
                    element: <Ecommerce />
                }
            ]
        },
        // {
        //     path: 'utils',
        //     children: [
        //         {
        //             path: 'util-typography',
        //             element: <UtilsTypography />
        //         }
        //     ]
        // },
    ]
};
export default NormalRoutes;
