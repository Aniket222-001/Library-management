import React from 'react';
import AddBook from './components/AddBook';
import BookList from './components/BookList';

const App = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <AddBook />
                <BookList />
            </div>
        </div>
    );
};

export default App;
