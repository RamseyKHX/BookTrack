import React, { useState } from "react";
import { addBook } from "../services/firestoreService";
import { searchBooks } from "../services/googleBooksAPI";

export default function AddBook() {
    const [query, setQuery] = useState(""); // Search query
    const [results, setResults] = useState([]); // Google Books search results
    const [loading, setLoading] = useState(false); // Loading state
    const [successMessage, setSuccessMessage] = useState(""); // Success message

    // Search for books from Google Books
    const handleSearch = async () => {
        if (!query.trim()) {
            alert("Please enter a search term.");
            return;
        }
        setLoading(true);
        try {
            const books = await searchBooks(query);
            setResults(books);
        } catch (error) {
            console.error("Error during search:", error);
            alert("Failed to search books. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Add book to Firestore
    const handleAddToLibrary = async (book, category) => {
        const newBook = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors?.join(", ") || "Unknown",
            category: category || "Reading", // Default to "Reading" if no category is selected
            thumbnail: book.volumeInfo.imageLinks?.thumbnail || null, // Get thumbnail URL if available
            description: book.volumeInfo.description || "No description available.", // Get description
        };
    
        try {
            await addBook(newBook); // Save the book details to Firestore
            setSuccessMessage(`Book "${newBook.title}" added to your library as "${newBook.category}".`);
            setTimeout(() => setSuccessMessage(""), 3000); // Clear success message
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book. Please try again.");
        }
    };
    

    // Inline styles
    const styles = {
        container: {
            backgroundColor: "#f4f4f9",
            minHeight: "100vh",
            padding: "20px",
            fontFamily: "'Roboto', sans-serif",
        },
        header: {
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#007acc",
            color: "#fff",
            marginBottom: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        title: {
            fontSize: "2.5rem",
            margin: 0,
        },
        successMessage: {
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
        },
        searchBar: {
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
        },
        input: {
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "300px",
            marginRight: "10px",
            fontSize: "1rem",
        },
        searchButton: {
            padding: "10px 20px",
            backgroundColor: "#007acc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.3s",
        },
        resultsContainer: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
        },
        card: {
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "15px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
        },
        thumbnail: {
            width: "100%",
            borderRadius: "8px",
            marginBottom: "10px",
        },
        cardContent: {
            textAlign: "center",
        },
        bookTitle: {
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "10px",
        },
        text: {
            fontSize: "0.9rem",
            marginBottom: "5px",
            color: "#555",
        },
        actions: {
            marginTop: "10px",
        },
        select: {
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            fontSize: "1rem",
            width: "100%",
        },
        addButton: {
            padding: "10px",
            backgroundColor: "#007acc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            width: "100%",
            transition: "background-color 0.3s",
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Add a Book</h1>
            </header>

            {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

            <div style={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleSearch} style={styles.searchButton} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>

            <div style={styles.resultsContainer}>
                {results.length > 0 ? (
                    results.map((book) => (
                        <div
                            key={book.id}
                            style={styles.card}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            {book.volumeInfo.imageLinks?.thumbnail && (
                                <img
                                    src={book.volumeInfo.imageLinks.thumbnail}
                                    alt={book.volumeInfo.title}
                                    style={styles.thumbnail}
                                />
                            )}
                            <div style={styles.cardContent}>
                                <h3 style={styles.bookTitle}>{book.volumeInfo.title}</h3>
                                <p style={styles.text}>
                                    <strong>Author(s):</strong> {book.volumeInfo.authors?.join(", ") || "Unknown"}
                                </p>
                                <p style={styles.text}>
                                    <strong>Published:</strong> {book.volumeInfo.publishedDate || "N/A"}
                                </p>
                                <div style={styles.actions}>
                                    <select
                                        style={styles.select}
                                        defaultValue="Reading"
                                        onChange={(e) => (book.selectedCategory = e.target.value)}
                                    >
                                        <option value="Reading">Reading</option>
                                        <option value="Read">Read</option>
                                        <option value="Want to Read">Want to Read</option>
                                    </select>
                                    <button
                                        onClick={() => handleAddToLibrary(book, book.selectedCategory)}
                                        style={styles.addButton}
                                    >
                                        Add to Library
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", color: "#555" }}>
                        No results found. Try searching for a book.
                    </p>
                )}
            </div>
        </div>
    );
}
