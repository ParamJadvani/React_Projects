
import React from "react";

// interface UseRefExProps {
//     btnRef:React.RefObject<HTMLButtonElement |null>
// }

// const UseRefEx = ({ btnRef }: { btnRef: React.RefObject<HTMLButtonElement | null> }) => {
const UseRefEx:React.FC<{btnRef:React.RefObject<HTMLButtonElement|null>}> = ({btnRef})=>{
    console.log(btnRef);
    const toggleBtn = () => {
        if (btnRef.current) {
            btnRef.current.style.display =
                btnRef.current.style.display === "none" ? "inline-block" : "none";
        }
    };

    return (
        <div className="flex flex-col items-center mt-14">
            <h1 className='text-3xl font-bold mb-2'>UseRef Example</h1>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={toggleBtn}
            >
                Toggle Button
            </button>
        </div>
    );
};

export default React.memo(UseRefEx);
