const playlist = document.getElementById('playlist');
const templateCard = document.getElementById('cardPlayList').content;

const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () =>{
    fetchPlaylist();
})

const fetchPlaylist = async () => {
    const data = await fetch('./api/playlists.json');
    const play = await data.json();
    creaTarjetas(play.playlists.items);
}


const creaTarjetas = (cards) => {
    cards.forEach((item) => {
        templateCard.querySelector('h5').textContent = item.data.name;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    playlist.appendChild(fragment);
}