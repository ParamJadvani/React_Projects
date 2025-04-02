export interface Movie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
    backdrop_path?: string;
    status?: "pending" | "watched";
    review?: {
        rating: number;
        message: string;
    };
}
