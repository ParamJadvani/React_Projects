import Cart from "@/components/Cart";
import CategoriesPage from "@/components/CategoriesPage";
import CategoriesPageData from "@/components/CategoriesPageData";
import FoodDetail from "@/components/FoodDetail";
import FoodPage from "@/components/FoodPage";
import Home from "@/components/Home";
import Login from "@/components/Login";
import PrivateRoutes from "@/components/PrivetRoutes";
import Signup from "@/components/Signup";
import { Route, Routes } from "react-router-dom";

const AllRoute = () => {
    return (
        <Routes>
            {/* Public Routes */}

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private Routes */}
            <Route
                path="/"
                element={
                    <PrivateRoutes>
                        <Home />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/foods"
                element={
                    <PrivateRoutes>
                        <FoodPage />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/food/:id"
                element={
                    <PrivateRoutes>
                        <FoodDetail />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/cart"
                element={
                    <PrivateRoutes>
                        <Cart />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/categories"
                element={
                    <PrivateRoutes>
                        <CategoriesPage />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/categories/:id"
                element={
                    <PrivateRoutes>
                        <CategoriesPageData />
                    </PrivateRoutes>
                }
            />
        </Routes>
    );
};

export default AllRoute;
