import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addUserApi } from "@/api/userApi";
import useUserStore from "@/store/userStore";

const Signup = () => {
    const { addToUser } = useUserStore(); // Using store to add the user

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, password } = signupData;

        // Basic validation
        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Call the API to add the user
            const newUser = await addUserApi({
                name,
                email,
                password,
            });

            // Once the user is created, update the store with the new user
            addToUser({ ...newUser, id: Date.now() });

            // Clear the form and reset loading state
            setSignupData({ name: "", email: "", password: "" });
            setLoading(false);
        } catch (err) {
            console.error("Error during signup:", err);
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-md max-w-md mx-auto">
            <h2 className="text-lg font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={signupData.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={signupData.email}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={signupData.password}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className={`bg-green-500 text-white p-2 rounded hover:bg-green-600 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Signup"}
                </button>
                <p className="text-center text-gray-500">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
