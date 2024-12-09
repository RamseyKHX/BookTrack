"use client";

import React, { useState } from "react";
import { db } from "./_utils/firebase";

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "books"), {
        title,
        author,
        createdAt: new Date(),
      });

      setTitle("");
      setAuthor("");
      alert("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>
      <form onSubmit={handleAddBook} className="space-y-4">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
