import { Book } from "../models/Book";

export const sortBooks = (books: Book[]): Book[] => {
    const filteredBooks = books.filter(book => book.last_read !== undefined);
    const sortedBooks = filteredBooks.sort((a, b) => a.last_read.toDate() > b.last_read.toDate() ? -1 : a.last_read.toDate() < b.last_read.toDate() ? 1 : 0)
    return sortedBooks;
}

export const getMostRecentBook = (books: Book[]): Book => {
    return sortBooks(books)[0];
}