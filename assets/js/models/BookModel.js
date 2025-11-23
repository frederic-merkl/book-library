export class Book {
    static categoryList = ["Not Set", "Chose a Category", "Fantasy", "Science Fiction", "Horror", "Mystery", "Crime", "Thriller", "Romance", "Historical Fiction", "Children’s Fiction", "Classics", "Biography / Memoir", "History", "Science & Nature", "Self-Help / Personal Development", "Philosophy & Religion", "Psychology", "Business / Economics", "Politics / Society", "Art & Photography", "Cooking / Food", "Travel", "Health", "Education", "Technology", "Comics / Graphic Novels", "Poetry", "Drama / Theatre"];
    #id;
    #title;
    #cover;
    #category;
    #author;
    #publisher;
    #pages;
    #doneReading;

    constructor (title, cover,  author, category, pages, publisher, doneReading) {
        console.log("Book constructor called with:", { title, cover, author, category, pages, publisher, doneReading });
        
        if (typeof title !== "string" || !title.trim()) {throw new Error ("ENTER VALID TITLE")}
        if (title.trim().length > 200) {throw new Error ("TITLE TO LONG");}

        if (typeof author !== "string") {throw new Error ("ENTER VALID AUTHOR");}
        if (author.trim().length > 50) {throw new Error ("AUTHOR NAME IS TO LONG");}

        if (typeof category !== "string" || !this.validateCategory(category)) {throw new Error ("CHOSE VALID CATEGORY");}
        if (category === "Chose a Category") {category = "Not Set";}
        
        if (typeof pages !== "string") {throw new Error ("ENTER VALID PAGE NUMBER");}
        if (pages.trim()) {
            const num = Number(pages);
            if (num < 0 || !isFinite(num)) {throw new Error ("ENTER A VALID NUMBER ABOVE ZERO");}
        }
        if (typeof publisher !== "string") {throw new Error ("NOT A VALID PUBLISHER");}
        if (publisher.trim().length > 50) {throw new Error ("PUBLISHER TO LONG");}    
        
        if (typeof doneReading !== "boolean") {throw new Error ("DONE-READING MUST BE A BOOLEAN VALUE")}
       
        this.#id = crypto.randomUUID();
        this.#title = title.trim();
        this.#cover = cover; // src path
        this.#category = category.trim();
        this.#author = author.trim();
        this.#publisher = publisher.trim();
        this.#pages = pages.trim();
        this.#doneReading = doneReading;
    }

    validateCategory (category) {
       return Book.categoryList.includes(category.trim());
    }

    set title (title) {
        if (typeof title !== "string" || !title.trim()) {throw new Error ("ENTER VALID TITLE")}
        this.#title = title.trim();
    }

    get title () {
        return this.#title;
    }
    // pseudocode
    set cover (url) {
        try {
            src= new URL(url);
            this.#cover = url;
        } catch (error) {
             console.error("Set cover error:", error);
        }
    }

    get cover () {
        return this.#cover
    }

    set author (author) {
    if (typeof author !== "string" || !author.trim()) {throw new Error ("ENTER VALID AUTHOR");}
    if (author.trim().length > 50) {throw new Error ("AUTHOR NAME IS TO LONG");}
    this.#author = author.trim();
    }

    get author () {
        return this.#author;
    }

    set category (category) {
        if (typeof category !== "string" || !this.validateCategory(category)) {throw new Error ("CHOSE VALID CATEGORY")}
        this.#category = category
    }
  
    get category () {
       return this.#category;
    }

    set pages (pages) {
    if (typeof pages !== "string" || !pages.trim()) {throw new Error ("ENTER VALID PAGE NUMBER");}
    const num = Number(pages);
    // isFinite returns false. check if smaller 0 or infinite
    if (num < 0 || !isFinite(num)) {throw new Error ("ENTER A VALID NUMBER ABOVE ZERO")}
    this.#pages = pages
    }

    get pages () {
       return this.#pages;
    }

    set publisher (publisher) {
    if (typeof publisher !== "string" || !publisher.trim()) {throw new Error ("NOT A VALID PUBLISHER");}
    if (publisher.trim().length > 50) {throw new Error ("PUBLISHER TO LONG");} 
    this.#publisher = publisher.trim();
    }
  
    get publisher () {
       return this.#publisher;
    }

    set doneReading (boolean) {
        if (typeof boolean !== "boolean") {throw new Error ("NOT A VALID BOOLEAN VALUE");}
        this.#doneReading = boolean;
    }

    get doneReading () {
    return this.#doneReading;
    }

    get categoryList () {
        return Book.categoryList;
    }

}