//elements
const searchBar = document.querySelector('.search-input');
const introText = document.querySelector('.intro_text');
const resultBody = document.querySelector('.results_albums');
const loader = document.querySelector('.intro_loader');
const addBtn = document.querySelector('.intro_add10')

let totalResults = [];
let shownResults = [];

let timer;
const waitTime = 1000;

searchBar.addEventListener('keypress', handleKeyPress);
searchBar.addEventListener('keyup', handleKeyUp);

function handleKeyUp(e) {
    window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
    timer = window.setTimeout(() => {
    console.log('Typing done. Make request')
    search();
    }, waitTime);
}

function handleKeyPress(e) {
    window.clearTimeout(timer);
    console.log("typing...")
}

/*
function checkEnter(e) {

    console.log("typing")
    //Reset the timer
    clearTimeout(timer);

    timer = setTimeout(() => {
        console.log("time to go")
        search();
    }, waitTime)
}
*/

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
                addBtn.style.display="inline";
                introText.innerHTML = `${json.resultCount} results for "${term}"`
                totalResults = json.results;
                if(json.resultCount < 20){
                    renderList(json.results)
                }
                else{
                    for(let i=0; i<20; i++){
                        shownResults[i] = json.results[i];
                    }
                    renderList(shownResults);
                }
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

function add10(){
    
    let totalLen = totalResults.length;
    let shownLen = shownResults.length+10;

    if(shownLen > totalLen){
        for(let i=shownResults.length; i<totalLen; i++){
            shownResults[i] = totalResults[i];
            addBtn.style.display="none";
        }
    }
    else{
        for(let i=shownResults.length; i<shownLen; i++){
            shownResults[i] = totalResults[i];
        }
    }

    renderList(shownResults);


}