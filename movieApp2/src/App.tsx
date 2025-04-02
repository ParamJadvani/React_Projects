import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import WatchLater from "@/components/WatchLater";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<MovieList />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/watchLater" element={<WatchLater />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
