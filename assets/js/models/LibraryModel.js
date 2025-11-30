import { Book } from "./BookModel.js";

export class Library {
    #books = [];
   
    addBook (book) {
        for (let i = 0; i < this.#books.length; i++){
            if (book.title.toLowerCase() === this.#books[i].title.toLowerCase()){
                throw new Error ("Book already in library")
            }   
        }
        this.#books.push(book);
        console.log(this.#books)
    }

    deleteBook (title = undefined) {
        if (!title.trim()) {throw new Error ("Enter a valid title")}
        this.books = this.books.filter(book => book.title.toLowerCase() != title.toLowerCase().trim())
    }

    get books () {
        return this.#books;
    }

    set books (books) {
        this.#books = books;
    }
}
