import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Importing the Button component
import { loginUserApi } from "@/api/userApi"; // Assuming this is where your API call is
import useUserStore from "@/store/userStore"; // Zustand store import

const Login = () => {
    const { loginUser } = useUserStore();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = credentials;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            // Make the API call to login the user
            const users = await loginUserApi(email, password); // Assuming the API returns an array of users

            if (Array.isArray(users) && users.length > 0) {
                const user = users[0]; // Get the first user (you can adjust this depending on how the API works)

                if (user && user.id) {
                    // If the user is valid, update the store with user data
                    loginUser(user);
                    navigate("/foods"); // Redirect to dashboard or home after successful login
                } else {
                    alert("Invalid credentials. Please try again.");
                }
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="p-4 border rounded-md max-w-md mx-auto">
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <Button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </Button>
                <p className="text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
