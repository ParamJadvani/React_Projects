import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MovieDetailSkeleton = () => {
    return (
        <div className="container mx-auto my-4 p-4">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                    <Skeleton className="w-full h-64 md:h-80 rounded" />
                </div>
                <div className="md:ml-4 flex-1">
                    <Skeleton className="w-1/2 h-8 mb-4" />
                    <Skeleton className="w-full h-6 mb-4" />
                    <Skeleton className="w-2/3 h-6" />
                    <div className="mt-4">
                        <Skeleton className="w-1/3 h-6 mb-2" />
                        <Skeleton className="w-full h-10 mb-2" />
                        <Skeleton className="w-full h-16" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MovieDetailSkeleton);
