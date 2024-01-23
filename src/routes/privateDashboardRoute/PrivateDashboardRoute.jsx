/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import BigSpinner from "../../shared/loader/BigSpinner";

const PrivateDashboardRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return <BigSpinner />
    }


    if (user.phone && user.role == 'admin') {
        return children
    }
    return <Navigate to='/sign-in' state={{ from: location }} replace></Navigate>
        
};

export default PrivateDashboardRoute;