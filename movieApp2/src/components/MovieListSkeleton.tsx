import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MovieListSkeleton = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center space-x-2 my-4 p-4 bg-gray-100/50 rounded-md">
                <Skeleton className="w-[90%] h-10 rounded-md" />
                <Skeleton className="w-[10%] h-10 rounded-md" />
            </div>
            <div className="w-1/2 flex flex-row p-5 my-3 hover:bg-white">
                <div className="flex justify-between items-center px-3 w-full">
                    <Skeleton className="w-1/2 h-10 rounded-md mx-2" />
                    <Skeleton className="w-1/2 h-10 rounded-md" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array(10)
                    .fill(null)
                    .map((_, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <Skeleton className="w-full h-64 md:h-80 rounded" />
                            <Skeleton className="w-full h-6 rounded-md" />
                            <Skeleton className="w-2/3 h-6 rounded-md" />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default React.memo(MovieListSkeleton);
