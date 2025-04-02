import React from "react";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [data, setData] = React.useState<{ name?: string; email?: string }>({});
    const navigate = useNavigate();

    const {updateUserData } = React.useContext(UserDataContext) || {};
    console.log(updateUserData)

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.name?.trim() === "" || data.email?.trim() === "")
            return alert("Please fill in all fields");
        updateUserData?.(data);
        setTimeout(()=>{
            navigate('/');
        },3000)
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Signup Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name || ""}
                        onChange={changeInput}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email || ""}
                        onChange={changeInput}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
