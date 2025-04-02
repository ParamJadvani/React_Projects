import React from "react";
import useLocalStorage from "../customehooks/useLocalStorage";

interface UserData {
    name?: string;
    email?: string;
}

interface UserDataContextType {
    userData: UserData;
    updateUserData: (data: UserData) => void;
}

const UserDataContext = React.createContext<UserDataContextType | undefined>(undefined);

const UserDataContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useLocalStorage<UserData>({
        key: "userData",
        defaultValue: {},
    });

    const updateUserData = (data: UserData) => {
        setUserData({ ...userData, ...data });
    };
    return (
        <UserDataContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataContextProvider;
export { UserDataContext };
