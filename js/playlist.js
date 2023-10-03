const url = window.location.search;
const params = new URLSearchParams(url);
const id = params.get('id');

const infoplaylist = {};
const banerPlaylist = document.getElementById('cardInfo');



console.log('Id de la playlist', id);

document.addEventListener('DOMContentLoaded', () => {
    fetchPlaylist();
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
        console.log('amdiwnin',result);
        // Verifica si 'items' es un array antes de llamar a addSongsToPlaylist
        if (Array.isArray(result.items)) {
            addSongsToPlaylist(result.items);
        } else {
            console.error('La propiedad "items" de la respuesta no es un array.');
        }
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

// Función para agregar canciones dinámicamente
const addSongsToPlaylist = (songs) => {
    const songsContainer = document.querySelector('.playlistContainer .viewSongs');
    const songTemplate = document.getElementById('song');

    songs.forEach((item) => {
        const songClone = document.importNode(songTemplate.content, true);

        songClone.querySelector('.nameSong p').textContent = item.track.name;
        songClone.querySelector('.artistSong p').textContent = item.track.artists.map(artist => artist.name).join(', ');
        songClone.querySelector('.albumSong p').textContent = item.track.album.name;
        songClone.querySelector('.dateSong p').textContent = item.track.album.release_date;
        
        // Cambiar la imagen a la versión más pequeña
        const imageUrl = item.track.album.images.find(image => image.height === 64 && image.width === 64);
        if (imageUrl) {
            songClone.querySelector('.imageSong img').src = imageUrl.url;
        } else {
            // Si no se encuentra una imagen de 64x64, puedes mostrar una imagen por defecto.
            songClone.querySelector('.imageSong img').src = '../img/loadCardImage64x64.png';
        }

        songsContainer.appendChild(songClone);
    });
}
