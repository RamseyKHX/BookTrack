"use client";

import React, { useEffect, useState } from "react";
import { db } from "./booktrack/_utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import BookCard from "./booktrack/BookCard";

export default function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const snapshot = await getDocs(booksCollection);
      const booksList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(booksList);
    };
    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Tracker</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
