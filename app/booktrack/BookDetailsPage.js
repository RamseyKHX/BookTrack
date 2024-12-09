"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "./_utils/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default function BookDetailsPage({ params }) {
  const { id } = params;
  const [book, setBook] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      const docRef = doc(db, "books", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBook(docSnap.data());
      } else {
        alert("No such book!");
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "books", id));
      alert("Book deleted successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-700">Author: {book.author}</p>
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete Book
      </button>
    </div>
  );
}
