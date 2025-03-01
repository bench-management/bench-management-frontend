import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";
import AdminNavbar from "./AdminNavbar";

// eslint-disable-next-line react/prop-types
const AuthenticatedRoute = ({ element: Component }) => {
    return isAuthenticated() ? (
        <div style={{}}>
            <AdminNavbar />
            {Component}
        </div>
    ) : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
