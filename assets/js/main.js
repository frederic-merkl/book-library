import { Library } from "./models/LibraryModel.js";
import { LibraryView } from "./ui/LibraryView.js";
import { BookFormView } from "./ui/BookFormView.js";
import { LibraryController } from "./controller/LibraryController.js";
import { OpenLibraryService } from "./services/OpenLibraryService.js"; 

const library = new Library();
const openlibraryService = new OpenLibraryService()
const libraryController = new LibraryController(library, openlibraryService)
const libraryView = new LibraryView(libraryController);
const bookFormView = new BookFormView(libraryController, showLibraryView);
 

window.addEventListener("DOMContentLoaded", () => {
    init();
    libraryView.initLibraryView();
}); 

//Initilizes navbar buttons
function init () {
    const addButton = document.querySelector(".button--add");
    const deleteButton = document.querySelector(".button--delete");
    addButton.addEventListener("click", () => bookFormView.initBookFormView("addBookForm"));
    deleteButton.addEventListener("click", () => bookFormView.initBookFormView("deleteBookForm"));
    }
// inversion of control => logik injezierung als callblack - main behandelt view wechsel.
export function showLibraryView () {
    try {
        libraryView.initLibraryView();
    } catch (error) {
        console.error(error)
    } 
}


