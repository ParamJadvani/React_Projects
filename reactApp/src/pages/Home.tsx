import React, { useContext } from "react";
import UseRefEx from "../components/UseRefEx";
import { UserDataContext } from '../context/UserDataContext';

type ActionType = "DECREMENT";

const reducer = (state: number, action: ActionType): number => {
    switch (action) {
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
};

const Home: React.FC = () => {
    const [count, setCount] = React.useState<number>(0);
    const [state, dispatch] = React.useReducer(reducer, 0);
    const btnRef = React.useRef<HTMLButtonElement>(null);
    const {userData} = useContext(UserDataContext)||{};

    // const memo = React.useMemo(()=>{},[])

    const incrementCount = React.useCallback(() => {
        setCount((prevCount) => prevCount + 1);
    }, []);

    const decrementCount = React.useCallback(() => {
        dispatch("DECREMENT");
    }, []);

    React.useEffect(() => {
        console.log(`Count has changed: ${count}`);
        console.log(`UserData has changed: ${userData?.name} ${userData?.email}`);
        return () => {
            console.log(`Cleaning up count change effect for count: ${count}`);
        };
    }, [count,userData]);

    return (
        <div>
            <div className="flex flex-col items-center mt-10">
                <p>Count (useState): {count}</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-block"
                    onClick={incrementCount}
                    ref={btnRef}
                >
                    Click Me for INCREMENT
                </button>
                <p>Count (useReducer): {state}</p> 
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full inline-block mt-1"
                    onClick={decrementCount}
                >
                    Click Me for DECREMENT
                </button>
            </div>
            <UseRefEx btnRef={btnRef} />

            {userData && (
                <div className="mt-6 p-4 bg-gray-100 rounded-md">
                    <h2 className="text-lg font-semibold text-gray-800">User Data:</h2>
                    <p className="text-sm text-gray-600">{userData.name}</p>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
