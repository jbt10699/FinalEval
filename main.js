//elements
const searchBar = document.querySelector('.search-input');
const introText = document.querySelector('.intro_text');
const resultBody = document.querySelector('.results_albums');
const loader = document.querySelector('.intro_loader');


function checkEnter(e) {
    //perform the search function if the user presses enter in the search bar
    if (e.keyCode === 13) {
        search()
    }
}


function search() {
    let term = searchBar.value;

    if (term === "") {
        //display warning for empty serach
        introText.innerHTML = "PLEASE FILL OUT THE SEARCH FIELD"
        introText.style.color = "red"
        searchBar.style.border = "2px solid red"
    }

    else {
        //reset warning text styling
        introText.style.color = null
        searchBar.style.border = null

        //show loading circle and hide text
        introText.style.display="none";
        loader.style.display="inline";

        fetchJsonp(`https://itunes.apple.com/search?term=${term}&media=music&entity=album&attribute=artistTerm&limit=200`)
            .then((response) => response.json())
            .then((json) => {
                //hide loading circle and show text once resolved
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