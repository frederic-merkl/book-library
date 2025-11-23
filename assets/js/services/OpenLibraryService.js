export class OpenLibraryService {

  async fetchBookData (dataObj) {
        // In order to avoid emtpy query parameters I have to filter the object.
        const filteredData = Object.entries(dataObj).filter((data) => {
             return data[1].trim() !== "";
        })
        
        const baseURL = "http://localhost:3000/api/books"; // wie dynamisch setzen?
        const URLparam = new URLSearchParams(filteredData);
        const queryString = String(URLparam);

        const response = await fetch (`${baseURL}?${queryString}`);
        console.log(await response.json())      
        if (!response.ok) {throw new Error ("fetch error")}

        //return response.json();
    }
}