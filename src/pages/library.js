import React, { useEffect, useState } from "react";
import { getBooks } from "../services/firestoreService";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Library() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch books from Firestore
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await getBooks();
                setBooks(fetchedBooks); // Ensure the Firestore document IDs are included
            } catch (error) {
                console.error("Error fetching books:", error);
                alert("Failed to fetch books.");
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    // Delete book from Firestore
    const handleDelete = async (bookId) => {
        console.log("Attempting to delete book with ID:", bookId); // Debugging log
        if (confirm("Are you sure you want to delete this book?")) {
            try {
                await deleteDoc(doc(db, "books", bookId)); // Delete the document
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId)); // Update UI
                alert("Book deleted successfully.");
            } catch (error) {
                console.error("Error deleting book:", error);
                alert("Failed to delete book. Please try again.");
            }
        }
    };

    if (loading)
        return (
            <div
                style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    color: "#007acc",
                    marginTop: "50px",
                }}
            >
                Loading your library...
            </div>
        );

    const categorizedBooks = {
        Reading: books.filter((book) => book.category === "Reading"),
        Read: books.filter((book) => book.category === "Read"),
        "Want to Read": books.filter((book) => book.category === "Want to Read"),
    };

    const styles = {
        container: {
            backgroundColor: "#f4f4f9",
            minHeight: "100vh",
            padding: "20px",
            fontFamily: "'Roboto', sans-serif",
        },
        header: {
            textAlign: "center",
            marginBottom: "40px",
        },
        title: {
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#007acc",
        },
        categoryContainer: {
            marginBottom: "40px",
        },
        categoryTitle: {
            fontSize: "2rem",
            fontWeight: "600",
            color: "#333",
            marginBottom: "20px",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
        },
        card: {
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "15px",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        cardHover: {
            transform: "scale(1.03)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
        thumbnail: {
            width: "120px",
            height: "160px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
        },
        bookTitle: {
            fontSize: "1.1rem",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#333",
        },
        author: {
            fontSize: "0.9rem",
            marginBottom: "5px",
            color: "#555",
        },
        description: {
            fontSize: "0.85rem",
            color: "#777",
            marginTop: "10px",
        },
        deleteButton: {
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>My Library</h1>
            </header>

            {Object.keys(categorizedBooks).map((category) => (
                <section key={category} style={styles.categoryContainer}>
                    <h2 style={styles.categoryTitle}>{category}</h2>
                    <div style={styles.grid}>
                        {categorizedBooks[category].map((book) => (
                            <div
                                key={book.id}
                                style={styles.card}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            >
                                {book.thumbnail ? (
                                    <img
                                        src={book.thumbnail}
                                        alt={book.title}
                                        style={styles.thumbnail}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            ...styles.thumbnail,
                                            backgroundColor: "#ccc",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "0.8rem",
                                            color: "#555",
                                        }}
                                    >
                                        No Image
                                    </div>
                                )}
                                <h3 style={styles.bookTitle}>{book.title}</h3>
                                <p style={styles.author}>
                                    <strong>Author:</strong> {book.author}
                                </p>
                                {book.description && (
                                    <p style={styles.description}>
                                        {book.description.length > 100
                                            ? `${book.description.substring(0, 100)}...`
                                            : book.description}
                                    </p>
                                )}
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => handleDelete(book.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
