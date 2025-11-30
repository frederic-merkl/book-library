import { insertTemplateToDOM } from "./util/ui-util.js";

export class AddBookFormView {
    // dependency injection for the controller and a callback which navigates back to libraryView.
    constructor (libraryController, viewCallback) {
        this.libraryController = libraryController;
        this.viewCallback = viewCallback;           
    }
// TODO: Refactor the architecture. 
// init und formhandle logik hängen zu stark zusammen
// Versuche das O von SOLID zu implementieren und ueber die gesamte app das S zu strukturieren
// realisierend wie wichtig das O ist, wird meine funktion immer komplizierter.
    async init () {

        const path = `./assets/templates/addBookForm.html`;
        
        try {
            // Fetch template and inser to DOM
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error("Template not found at: " + path);
            }
            
            const templateHTML = await response.text();
            insertTemplateToDOM(templateHTML);

            const bookForm = document.querySelector(".addBookForm");
            if (!bookForm) {throw new Error ("Add book form template not found")}

            const backToLibraryButton = document.querySelector(".backToLibraryButton");
            if (!backToLibraryButton) {throw new Error ("backToLibraryButton not found")} 

            const getbookDataButton = document.querySelector(".getbookDataButton");
            if (!getbookDataButton) { throw new Error ("getbookDataButton not found")};

            getbookDataButton.addEventListener("click", async () => {
                const formData = new FormData(bookForm); // makes form-data object out of the form.
                const bookData = Object.fromEntries(formData.entries()); // makes JS object out of from-data object.
                const fetchedBookData = await this.libraryController.getBookData(bookData);
                await this.populateForm(fetchedBookData);
            })
            // view change with injected callback.
            backToLibraryButton.addEventListener("click", async () => {
                    await this.viewCallback();
                })
        
            // handles for submit event on submit, not button click
            bookForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            // Extract form-data and make js object
            const form = event.target; // Das Formular-Element
            await this.handleFormData(form);
            await this.viewCallback(); //TODO view wechel nur bei erfolg.

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

    async populateForm (fetchedBookData) {
        console.log(fetchedBookData)
        try {
        const bookForm = document.querySelector(".addBookForm");
        bookForm.author.value = fetchedBookData.docs[0].author_name[0];
        console.log(bookForm.author.value)
        } catch (error) {
            console.log(error)} 
        }


  async handleFormData (form) {
        
        const formData = new FormData(form); // FormData-Objekt erstellen
        const bookData = Object.fromEntries(formData.entries()); // macht ein JS Objekt aus formData

            try {
                const newBook = await this.libraryController.addBookFormData(bookData); // I dont need the const yet. Its better for testing und future functionality
            } catch (error) {
                console.error(error.stack);
                const errorMessageElement = document.querySelector(".errorMessage");
                if (errorMessageElement) errorMessageElement.textContent = `${error.message}`;
                console.error(error.message);              
            }
        }
    }
