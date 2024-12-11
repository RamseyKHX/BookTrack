import { useRouter } from "next/router";

export default function BookCard({ book }) {
    const router = useRouter();

    const handleNavigation = () => {
        router.push(`/book/${book.id}`); // Dynamically insert `id`
    };

    return (
        <div
            className="p-4 border rounded shadow hover:shadow-lg cursor-pointer"
            onClick={handleNavigation}
        >
            <h3 className="font-bold">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Category: {book.category}</p>
        </div>
    );
}
