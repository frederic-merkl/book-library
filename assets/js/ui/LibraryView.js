import { insertTemplateToDOM } from "./util/ui-util.js";

export class LibraryView {

    constructor(libraryController) {
        if (!libraryController) { throw new Error("LibraryController required"); }
        this.libraryController = libraryController;
    }

    renderBooks() {
        try {
            // get books
            const books = this.libraryController.getLibraryContent();
            const bookListElement = document.querySelector(".book-list");
            // check if there is a booklistElement  
            if (!bookListElement) { throw new Error("No bookListElement found in DOM"); }
            // check if library is empty
            if (books.length === 0) {
                bookListElement.textContent = "Keine Bücher vorhanden.";
                return;
            }

            bookListElement.innerHTML = "";
            books.forEach(book => bookListElement.append(this.createBookElement(book)))

        } catch (error) {
            console.error(error.stack);
            const errorMessageElement = document.querySelector(".errorMessage");
            if (errorMessageElement)
                errorMessageElement.textContent = `${error.message}`;
            else {
                console.error(error.message);
            }
        }
    }

    async initLibraryView() {
        const path = "./assets/templates/libraryView.html";

        try {
            const response = await fetch(path);
            if (!response.ok) { throw new Error("Template not found"); }
            const libraryViewHtml = await response.text();
            insertTemplateToDOM(libraryViewHtml);
            this.renderBooks();
        } catch (error) {
            console.error(error.stack);
            const errorMessageElement = document.querySelector(".errorMessage");
            if (errorMessageElement) { errorMessageElement.textContent = error.message; }
            else {
                console.error(error.message);
            }
            throw error;
        }
    }

    createBookElement(book) {
        if (!book) { throw new Error("book is missing"); }

        const bookElement = document.createElement("div");
        bookElement.className = "book";
        const cover = document.createElement("img");
        //TODO the cover needs to be implemented differently
        //Set src only if there is a cover to not display broken image symbol
        if (book.cover) {
            cover.src = book.cover;
        } else {
            cover.removeAttribute("src");
        }
        cover.alt = !book.author ? book.title : `${book.title} by ${book.author}`;
        //insert cover into bookElement
        bookElement.append(cover);

        return bookElement;
    }
}