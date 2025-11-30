// TODO Check error handling chain


import { Library } from "./models/LibraryModel.js";
import { LibraryView } from "./ui/LibraryView.js";
import { AddBookFormView } from "./ui/addBookformView.js"; // Some sort of naming conflict. Old name has to be used.
import { DeleteBookFormView } from "./ui/DeleteBookFormView.js";
import { LibraryController } from "./controller/LibraryController.js";
import { OpenLibraryService } from "./services/OpenLibraryService.js"; 


const library = new Library();
const openlibraryService = new OpenLibraryService()
const libraryController = new LibraryController(library, openlibraryService)
const libraryView = new LibraryView(libraryController);
const addBookFormView = new AddBookFormView(libraryController, showLibraryView);
const deleteBookFormView = new DeleteBookFormView(libraryController, showLibraryView)


window.addEventListener("DOMContentLoaded", () => {
    init();
    libraryView.initLibraryView();
}); 


//Initilizes navbar buttons
function init () {
    const addButton = document.querySelector(".button--add");
    const deleteButton = document.querySelector(".button--delete");
    addButton.addEventListener("click", () => addBookFormView.init());
    deleteButton.addEventListener("click", () => deleteBookFormView.init());
    }

// inversion of control => logik injection as callblack - main handles view change.
// I did this because I thought its cool. And it was new to me. It probably better to make a goBack method in the view class
// I keep it to remind me of this concept.
export function showLibraryView () {
    try {
        libraryView.initLibraryView();
    } catch (error) {
        console.error(error)
    } 
}


