import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getBooks, updateBook, deleteBook } from "../../services/firestoreService";
import { fetchBookDetails } from "../../services/googleBooksAPI";

export default function BookDetailsPage() {
    const router = useRouter();
    const { id } = router.query;

    const [book, setBook] = useState(null); // Book data
    const [source, setSource] = useState(""); // Indicates whether book is from Firestore or Google Books
    const [category, setCategory] = useState(""); // Editable category for Firestore books

    useEffect(() => {
        const fetchBook = async () => {
            // Try fetching from Firestore
            const books = await getBooks();
            const foundBook = books.find((b) => b.id === id);

            if (foundBook) {
                setBook(foundBook);
                setCategory(foundBook.category);
                setSource("firestore");
            } else {
                // If not found in Firestore, fetch from Google Books
                const googleBook = await fetchBookDetails(id);
                if (googleBook) {
                    setBook({
                        title: googleBook.volumeInfo.title,
                        author: googleBook.volumeInfo.authors?.join(", ") || "Unknown",
                        description: googleBook.volumeInfo.description || "No description available.",
                        thumbnail: googleBook.volumeInfo.imageLinks?.thumbnail || null,
                    });
                    setSource("google");
                } else {
                    setBook(null);
                }
            }
        };

        if (id) fetchBook();
    }, [id]);

    const handleUpdateCategory = async () => {
        if (source === "firestore") {
            await updateBook(id, { category });
            alert("Category updated successfully!");
        }
    };

    const handleDelete = async () => {
        if (source === "firestore") {
            await deleteBook(id);
            router.push("/");
        }
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>

            {source === "firestore" && (
                <>
                    <p><strong>Category:</strong></p>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 mb-4 w-full"
                    >
                        <option value="Reading">Reading</option>
                        <option value="Read">Read</option>
                        <option value="Want to Read">Want to Read</option>
                    </select>
                    <button
                        onClick={handleUpdateCategory}
                        className="bg-green-500 text-white py-2 px-4 rounded mt-2"
                    >
                        Update Category
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white py-2 px-4 rounded mt-2 ml-4"
                    >
                        Delete Book
                    </button>
                </>
            )}

            {source === "google" && (
                <p>
                    <strong>Description:</strong> {book.description}
                </p>
            )}

            {book.thumbnail && (
                <img src={book.thumbnail} alt={book.title} className="mt-4" />
            )}
        </div>
    );
}
