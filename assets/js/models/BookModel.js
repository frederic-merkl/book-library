export class Book {
    #id;
    #title;
    #cover;
    #category;
    #author;
    #publisher;
    #pages;
    #doneReading;

    constructor (title, cover = undefined,  author = undefined, category = undefined, pages = undefined, publisher = undefined, doneReading = false) {
        console.log("Book constructor called with:", { title, cover, author, category, pages, publisher, doneReading });
        if (doneReading != false) {doneReading = true;} 
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#cover = cover; // src path
        this.#category = category;
        this.#author = author;
        this.#publisher = publisher;
        this.#pages = pages;
        this.#doneReading = doneReading;
    }

    set title (title) {
        if (!title){throw new Error ("Empty title not allowed")}
        this.#title = title;
    }

    get title () {
        return this.#title;
    }

    set cover (url) {
        try {
            src = new URL(url);
            this.#cover = url;
        } catch (error) {
             console.error("Set cover error:", error);
        }
    }

    get cover () {
        return this.#cover
    }

    set author (author) {
    if (!author.trim()){throw new Error ("Empty author not allowed in this operation")}
    this.#author = author;
    }

    get author () {
        return this.#author;
    }

    set category (category) {
        this.category = category
    }
  
    get category () {
       return this.category;
    }

    set pages (pages) {
    this.pages = pages
    }

    get pages () {
       return this.pages;
    }

    set publisher (publisher) {
    this.#publisher = publisher
    }
  
    get publisher () {
       return this.publisher;
    }

    set doneReading (boolean) {
        this.doneReading = boolean;
    }

    get doneReading () {
    return this.#doneReading;
    }

}