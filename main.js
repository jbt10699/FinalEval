//elements
const searchBar = document.querySelector('.search-input');
const introText = document.querySelector('.intro_text');
const resultBody = document.querySelector('.results_albums');
const loader = document.querySelector('.intro_loader');



function checkEnter(e) {
    if (e.keyCode === 13) {
        search()
    }
}


function search() {
    //display loading circle
    //search, get results
    //display numFound and serach term
    let term = searchBar.value;

    if (term === "") {
        console.log("empty serach bar");
        introText.innerHTML = "PLEASE FILL OUT THE SEARCH FIELD"
        introText.style.color = "red"
        searchBar.style.border = "2px solid red"
    }

    else {
        console.log("Searching for " + term);
        introText.style.color = null
        searchBar.style.border = null

        introText.style.display="none";
        loader.style.display="inline";

        fetchJsonp(`https://itunes.apple.com/search?term=${term}&media=music&entity=album&attribute=artistTerm&limit=200`)
            .then((response) => response.json())
            .then((json) => {
                introText.style.display="inline";
                loader.style.display="none";
                introText.innerHTML = `${json.resultCount} results for "${term}"`
                renderList(json.results)
            })

    }
}


function renderList(json) {
    const allAlbums = generateAllAlbums(json);
    render(allAlbums, resultBody)
}

function generateAllAlbums(json) {
    let res = json.map(album => {
        return generateAlbumTmp(album);
    }).join('');
    return res;
}

function generateAlbumTmp(album) {
    return `<div class="albums_card">
    <img class="album_art" src=${album.artworkUrl100}>
    <p class="album_name">${album.collectionName}</p>
    <p class="album_copyright">${album.copyright}</p>
</div>`
}

function render(template, element) {
    element.innerHTML = template;
}