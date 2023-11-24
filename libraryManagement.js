let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");

function createAndAppendBookItems(search_item) {
    let {
        author,
        imageLink,
        title
    } = search_item;
    let bookContainerEl = document.createElement("div");
    bookContainerEl.classList.add("col-6","col-md-4","mb-3");
    searchResultsEl.appendChild(bookContainerEl);

    let bookImgEl = document.createElement("img");
    bookImgEl.src = imageLink;
    bookContainerEl.appendChild(bookImgEl);

    let bookAuthorEl = document.createElement("p");
    bookAuthorEl.textContent = author;
    //bookAuthorEl.style.textAlign = "center";
    bookAuthorEl.style.fontSize="15px";
    bookContainerEl.appendChild(bookAuthorEl);

}

function displayLibraryBooks(search_results) {
    spinnerEl.classList.toggle("d-none");
    let headContainerEl=document.createElement("div");
    headContainerEl.classList.add("col-12");
    searchResultsEl.appendChild(headContainerEl);
    let headE1 = document.createElement("h1");
    headE1.style.color = "#323f4b";
    headE1.style.fontSize = "30px";
    headContainerEl.appendChild(headE1);
    if (search_results.length === 0) {
        headE1.textContent = "No Result Found";
        headE1.style.textAlign = "center";
    } else {
        headE1.textContent = "Popular Books";
        for (let search_item of search_results) {
            createAndAppendBookItems(search_item);
        }
    }
}

function sendRequest(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputValue;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData.search_results);
                displayLibraryBooks(jsonData.search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", sendRequest);