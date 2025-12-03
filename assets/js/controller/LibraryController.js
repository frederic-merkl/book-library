import { Book } from "../models/BookModel.js";

export class LibraryController {

    constructor(library, service) {
        if (!library || typeof library !== "object") { throw new Error("No library present"); }
        if (!service || typeof service !== "object") { throw new Error("No service present"); }
        this.library = library;
        this.service = service;
    }
    
    addBookFormData(bookData) {

        try {
            const newBook = new Book(bookData.title, bookData.cover, bookData.author, bookData.category, bookData.pages, bookData.publisher, bookData.doneReading)
            console.log("newbook", newBook)
            this.library.addBook(newBook);
            return newBook

        } catch (error) {
            console.error("handleBookSubmit error:", error);
            throw error;
        }
    }

    // returns openlibrary book data
    getBookData(bookData) {
        if (!bookData || typeof bookData !== "object") { throw new Error("No book data present"); }
        return this.service.fetchWorks(bookData);
    }

    getBookCover(openLibraryID) {
        if (!openLibraryID || typeof openLibraryID !== "string") { throw new Error("No open library cover ID found"); }
        return this.service.fetchCover(openLibraryID);
    }

    getLibraryContent() {
        return this.library.books;
    }

    deleteBook(title) {
        if (!title.trim() || typeof title !== "string") { throw new Error("Enter a valid title"); }

        this.library.deleteBook(title);
    }

}