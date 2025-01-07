import axios from 'axios';

const API_URL = 'http://localhost:5000/api';


export const getBooks = async () => axios.get(`${API_URL}/books`);
export const addBook = async (book) => axios.post(`${API_URL}/books`, book);
export const updateBook = async (id, book) => axios.put(`${API_URL}/books/${id}`, book);
export const deleteBook = async (id) => axios.delete(`${API_URL}/books/${id}`);
