import React from "react";
import HomePage from "./booktrack/HomePage";
import AddBookPage from "./booktrack/AddBookPage";
import BookDetailsPage from "./booktrack/BookDetailsPage";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-600 text-white py-4 px-8 shadow-md">
          <h1 className="text-2xl font-bold">Book Track</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddBookPage />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
