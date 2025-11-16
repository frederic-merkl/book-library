import { insertTemplateToDOM } from "./util/ui-util.js";

export class BookFormView {
    // dependency injection for the controller and a callback which navigates back to libraryView.
    constructor (libraryController, viewCallback) {
        this.libraryController = libraryController;
        this.viewCallback = viewCallback;           
    }

    async initBookFormView (bookFormTemplate) {
        // Set the path to the template dynamically
        const path = `./assets/templates/${bookFormTemplate}.html`;
        
        try {
            // Fetch template and inser to DOM
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error("Template not found at: " + path);
            }
            
            const templateHTML = await response.text();
            insertTemplateToDOM(templateHTML);

            const bookForm = document.querySelector(`.${bookFormTemplate}`);
            if (!bookForm) {throw new Error ("Book form template not found")}

            const backToLibraryButton = document.querySelector(".backToLibraryButton");
            if (!backToLibraryButton) {throw new Error ("backToLibraryButton not found")} 

            backToLibraryButton.addEventListener("click", async () => {
                    await this.viewCallback();
                })
        
            // handles for submit event on submit, not button click
            bookForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            // Extract form-data and make js object
            const form = event.target; // Das Formular-Element
            this.handleFormData(form);
            await this.viewCallback();

        })} catch (error) {
                console.error(error.stack);
                console.error("init book form view error:", error);
                const errorMessageElement = document.querySelector(".errorMessage");
                if (errorMessageElement)
                    errorMessageElement.textContent = `${error.message}`;
                else {
                    console.error(error.message);
                }    
        }
    }


  async handleFormData (form) {
        
        const formData = new FormData(form); // FormData-Objekt erstellen
        const bookData = Object.fromEntries(formData.entries()); // macht ein JS Objekt aus formData
        // !form.pages because I believe its a value that would be used for a delete. only for a addBook.
        if (!form.pages) {
            this.libraryController.deleteBook(form.title);
            
        } else {
            try {
                const newBook = await this.libraryController.addBookFormData(bookData); // I dont need the const yet. Its better for testing und future functionality
                await this.viewCallback();                              
            } catch (error) {
                console.error(error.stack);
                const errorMessageElement = document.querySelector(".errorMessage");
                if (errorMessageElement) errorMessageElement.textContent = `${error.message}`;
                console.error(error.message);              
            }
        }
    }
}