export class OpenLibraryService {

  async fetchWorks(dataObj) {


    const baseURL = "http://localhost:3000/api/books";
    // const URLparam = new URLSearchParams(filteredData);
    // const queryString = String(URLparam);
    // `${baseURL}?${queryString}`
    try {
      const response = await fetch(baseURL, {
        method: "POST", // um das objekt durchzureichen und den query string nicht 2 mal zu bauen.
        headers: { "Content-Type": "application/json" }, // header setzten damit der server weiß was er verarbeiten muss
        body: JSON.stringify(dataObj) //Macht JSON string aus JS objekt weil nur Text ueber HTTP gesendet werden kann.
      });
      // console.log(await response.text());
      if (!response.ok) { throw new Error("fetch error") }
      return response.json();
    } catch (error) {
      console.error(error)
    }

    //  async fetchCover (openLibraryCoverID) {
    //   const baseURL = "http://localhost:3000/api/cover"; 

    //   const queryString = String(URLparam);
    //  } 
  }
}