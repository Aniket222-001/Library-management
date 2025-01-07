import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook, updateBook } from '../Api/api';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [editBook, setEditBook] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedAuthor, setUpdatedAuthor] = useState('');
    const [updatedYear, setUpdatedYear] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            const { data } = await getBooks();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        await deleteBook(id);
        setBooks(books.filter((book) => book._id !== id));
    };

    const handleEdit = (book) => {
        setEditBook(book);
        setUpdatedTitle(book.title);
        setUpdatedAuthor(book.author);
        setUpdatedYear(book.publicationYear);
    };

    const handleUpdate = async () => {
        const updatedBook = {
            ...editBook,
            title: updatedTitle,
            author: updatedAuthor,
            publicationYear: updatedYear,
        };
        await updateBook(editBook._id, updatedBook);
        setBooks(books.map((book) => (book._id === editBook._id ? updatedBook : book)));
        setEditBook(null);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Book List</h2>
            <ul className="space-y-4">
                {books.map((book) => (
                    <li
                        key={book._id}
                        className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                    >
                        <div>
                            <h3 className="text-xl font-semibold">{book.title}</h3>
                            <p className="text-gray-600">
                                {book.author} - {book.publicationYear}
                            </p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEdit(book)}
                                className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition mr-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(book._id)}
                                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {editBook && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Update Book</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Author</label>
                        <input
                            type="text"
                            value={updatedAuthor}
                            onChange={(e) => setUpdatedAuthor(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Publication Year</label>
                        <input
                            type="text"
                            value={updatedYear}
                            onChange={(e) => setUpdatedYear(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                    >
                        Update Book
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookList;
