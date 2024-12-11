const API_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query) => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    try {
        const response = await fetch(`${API_URL}?q=${query}&key=${API_KEY}`);
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
};

export const fetchBookDetails = async (id) => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    try {
        const response = await fetch(`${API_URL}/${id}?key=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching book details:", error);
        return null;
    }
};
