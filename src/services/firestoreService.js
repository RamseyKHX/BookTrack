import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Fetch all books

export const addBook = async (book) => {
    try {
        await addDoc(collection(db, "books"), book); // Save book to the "books" collection
    } catch (error) {
        console.error("Error adding book to Firestore:", error);
        throw error;
    }
};

export const getBooks = async () => {
    const booksCollection = collection(db, "books");
    const querySnapshot = await getDocs(booksCollection);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include Firestore document ID
        ...doc.data(), // Include the rest of the book data
    }));
};

// Update an existing book
export const updateBook = async (id, updates) => {
    const docRef = doc(db, "books", id);
    await updateDoc(docRef, updates);
};

// Delete a book
export const deleteBook = async (id) => {
    const docRef = doc(db, "books", id);
    await deleteDoc(docRef);
};
