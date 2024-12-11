import React, { useEffect, useState } from "react";
import { searchBooks } from "../services/googleBooksAPI";

export default function Home() {
    const [popularBooks, setPopularBooks] = useState([]);

    useEffect(() => {
        const fetchPopularBooks = async () => {
            try {
                // Fetch popular books using a random query
                const randomQueries = ["fiction", "science", "technology", "history", "romance"];
                const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];
                const books = await searchBooks(randomQuery);
                setPopularBooks(books.slice(0, 9)); // Display top 9 books
            } catch (error) {
                console.error("Error fetching popular books:", error);
            }
        };
        fetchPopularBooks();
    }, []);

    // Inline styles
    const styles = {
        container: {
            minHeight: "100vh",
            background: "linear-gradient(to bottom right, #f4f4f9, #e3e8ed)",
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
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
        },
        card: {
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "15px",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
        },
        cardHover: {
            transform: "scale(1.03)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
        thumbnail: {
            width: "100%",
            borderRadius: "8px",
            marginBottom: "10px",
        },
        bookTitle: {
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#333",
        },
        author: {
            fontSize: "1rem",
            marginBottom: "5px",
            color: "#555",
        },
        footer: {
            textAlign: "center",
            marginTop: "40px",
            padding: "10px",
            backgroundColor: "#007acc",
            color: "#fff",
            borderRadius: "5px",
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>BookTrack</h1>
            </header>

            <main>
                <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "20px", color: "#007acc" }}>
                    Popular Books
                </h2>
                <div style={styles.grid}>
                    {popularBooks.map((book) => (
                        <div
                            key={book.id}
                            style={styles.card}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            {book.volumeInfo.imageLinks?.thumbnail && (
                                <img
                                    src={book.volumeInfo.imageLinks.thumbnail}
                                    alt={book.volumeInfo.title}
                                    style={styles.thumbnail}
                                />
                            )}
                            <h3 style={styles.bookTitle}>{book.volumeInfo.title}</h3>
                            <p style={styles.author}>
                                <strong>Author:</strong> {book.volumeInfo.authors?.join(", ") || "Unknown"}
                            </p>
                        </div>
                    ))}
                </div>
            </main>

            <footer style={styles.footer}>
                <p>&copy; 2024 BookTrack. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
