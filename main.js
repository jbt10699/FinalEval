//elements
const searchBar = document.querySelector('.search-input');
const introText = document.querySelector('.intro_text');
const resultBody = document.querySelector('.results_albums');


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

        fetchJsonp(`https://itunes.apple.com/search?term=${term}&media=music&entity=album&attribute=artistTerm&limit=200`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                console.log(json.resultCount)
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
    console.log("Album: " + album.collectionName);
    return `<div class="albums_card">
    <img class="album_art" src=${album.artworkUrl100}>
    <p class="album_name">${album.collectionName}</p>
</div>`
}

function render(template, element) {
    element.innerHTML = template;
}