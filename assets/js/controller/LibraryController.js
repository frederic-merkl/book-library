import { Book } from "../models/BookModel.js";

export class LibraryController {
     
    constructor (library) {
        this.library = library;

    }

    addBookFormData (bookData) {
        
        try {
            const newBook =  new Book(bookData.title, bookData.cover, bookData.author, bookData.category, bookData.publisher, bookData.pages, bookData.doneReading)
            console.log("newbook", newBook)
            this.library.addBook(newBook);
            return newBook

        } catch (error) {
            console.error("handleBookSubmit error:", error);
            throw error;
            }
    }

    getLibraryContent () {
        return this.library.books;
    }

    deleteBook (title) {
       this.library.deleteBook(title);
    }

}