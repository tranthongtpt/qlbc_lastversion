import { useRoutes } from 'react-router-dom';
import authRoutes from './NormalRoutes';
import normalRoutes from './AuthRoutes';

function Routes() {
    return useRoutes([authRoutes, normalRoutes]);
}
export default Routes;