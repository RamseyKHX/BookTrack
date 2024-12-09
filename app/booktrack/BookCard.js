import React from "react";
import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold">{book.title}</h2>
      <p className="text-gray-600">by {book.author}</p>
      <Link href={`/book/${book.id}`}>
        <a className="text-blue-600 hover:underline mt-2 block">View Details</a>
      </Link>
    </div>
  );
}
