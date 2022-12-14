import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the public routes
const PrivateRouter = () => {
  return (
    getToken() ? <Outlet/> : <Navigate to="/login"/>
  )
}
 
export default PrivateRouter;