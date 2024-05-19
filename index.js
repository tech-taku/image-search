const apiKey = "H3Y69M7K8aVAGngxV_GuYRiP4IUOp3sI1qpYwntILOc"

const form = document.querySelector("form");
const searchTextInput = document.querySelector("#search-input");
const buttonTextInput = document.querySelector("#search-button");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.querySelector("#show-more-btn");

let inputData = '';
let page = 1

async function searchImages() {
    inputData = searchTextInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        searchResults.textContent = '';
    }
    const results = data.results;

    results.map(result => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.self;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });

    page++;

    if (page > 1) {
        showMoreButton.style.display = "block";
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMoreButton.addEventListener('click', (event) => {
    searchImages();
})