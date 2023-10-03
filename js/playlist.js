const url = window.location.search;
const params = new URLSearchParams(url);
const id = params.get('id');

const infoplaylist ={};
const banerPlaylist= document.getElementById('cardInfo');



console.log('Id de la playlist',id);

document.addEventListener('DOMContentLoaded', () => {
    //fetchPlaylist();
    infoAlbum();
});

const fetchPlaylist = async () => {

    const url = `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=100`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b9b74838d6msheb05578c1835060p1c14f5jsn55f713d29745',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
} 

const returnHome = () => {
    window.location.replace(`/index.html`);
}

const newBanner = () => {
    const albumName = document.getElementById('albumTitle');
    const albumDescription = document.getElementById('albumDescription');
    const albumImage = document.getElementById('albumImage');
    albumName.textContent = infoplaylist.name;
    albumDescription.textContent = infoplaylist.description;
    albumImage.setAttribute('src', infoplaylist.images.items[0].sources[0].url || '../img/loadCardImage.png');
}

const infoAlbum = async () => {
    const data = await fetch('./api/playlists.json');
    const play = await data.json();

    play.playlists.items.forEach(element => {
        const uriParts = element.data.uri.split(":");
        const elementId = uriParts[uriParts.length - 1];
        if (elementId === id) {
            const { name, description, images } = element.data;
            infoplaylist.name = name;
            infoplaylist.description = description;
            infoplaylist.images = images;
        }
    });
    //console.log('INFO DE PLAYLIST', infoplaylist);
    newBanner();
}
