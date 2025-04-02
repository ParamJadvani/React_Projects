import useUserStore from "@/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Type for children, expecting React nodes
interface PrivateRoutesProps {
    children: React.ReactNode;
}

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
    const { currentUser } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login"); // Redirect to login if user is not authenticated
        }
    }, [currentUser, navigate]);

    // Render children only if user is authenticated
    return currentUser ? <>{children}</> : null;
};

export default PrivateRoutes;
