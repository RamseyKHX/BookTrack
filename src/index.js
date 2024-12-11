import React from "react";
import CategoryTabs from "../components/CategoryTabs";
import BookCard from "../components/BookCard";

export default function Home() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">BookTrack</h1>
            <CategoryTabs />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Replace with actual book data */}
                <BookCard title="Example Book" author="Author Name" category="Reading" />
            </div>
        </div>
    );
}
