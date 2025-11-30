import { insertTemplateToDOM } from "./util/ui-util.js";

export class DeleteBookFormView {

    constructor(libraryController, viewCallback) {
        this.libraryController = libraryController;
        this.viewCallback = viewCallback;
    }


    async init() {
        const path = `./assets/templates/deleteBookForm.html`;

        try {
            // Fetch template and inser to DOM
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error("Template not found at: " + path);
            }

            const templateHTML = await response.text();
            insertTemplateToDOM(templateHTML);

            const deleteBookForm = document.querySelector(".deleteBookForm");
            if (!deleteBookForm) { throw new Error("Delete book form template not found") }

            const backToLibraryButton = document.querySelector(".backToLibraryButton");
            if (!backToLibraryButton) { throw new Error("backToLibraryButton not found") }

            // view change with injected callback.
            backToLibraryButton.addEventListener("click", async () => {
                await this.viewCallback();
            })

            // handles for submit event on submit, not button click
            deleteBookForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                // Extract form-data and make js object
                const form = event.target; // Das Formular-Element
                await this.handleFormData(form);
                await this.viewCallback();

            })
        } catch (error) {
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

    async handleFormData(form) {

        const formData = new FormData(form); // FormData-Objekt erstellen
        const bookData = Object.fromEntries(formData.entries()); // macht ein JS Objekt aus formData

        try {
            this.libraryController.deleteBook(form.title.value);

        } catch (error) {
            console.error(error.stack);
            const errorMessageElement = document.querySelector(".errorMessage");
            if (errorMessageElement) errorMessageElement.textContent = `${error.message}`;
            console.error(error.message);
        }
    }
}
