function loginUser() {
    const name = document.getElementById('username-input').value.trim();
    if (name) {
        localStorage.setItem('streamify_user', name);
        document.getElementById('user-display').innerHTML = `👤 ${name}`;
        document.getElementById('login-screen').style.display = 'none';
    } else { alert("Escribe un nombre"); }
}

window.onload = () => {
    const saved = localStorage.getItem('streamify_user');
    if (saved) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('user-display').innerHTML = `👤 ${saved}`;
    }
    initHome();

    if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', togglePlay);
        navigator.mediaSession.setActionHandler('pause', togglePlay);
        navigator.mediaSession.setActionHandler('previoustrack', prevSong);
        navigator.mediaSession.setActionHandler('nexttrack', nextSong);
    }
};

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'Music Land Retro',
            text: 'Escucha la mejor música retro aquí:',
            url: window.location.href
        })
        .then(() => console.log('Compartido exitosamente'))
        .catch((error) => console.log('Error al compartir', error));
    } else {
        prompt("Copia este enlace para compartir:", window.location.href);
    }
}

// --- LISTA DE CANCIONES ---
const songs = [
    { title: "D Train - You're the One for Me", artist: "D Train", cover: "D-Train.jpg", audio: "https://archive.org/download/music-land-proyect/D%20Train%20-%20You%27re%20the%20One%20for%20Me%20%28Original%20Mix%29.mp3", likes: 0, category: "Funk" },
    { title: "Level 42 - Lessons In Love", artist: "Level 42", cover: "Level 42 Lessons in Love.jpg", audio: "https://archive.org/download/music-land-proyect/Level%2042%20-%20Lessons%20In%20Love%20%28Reconstructed%20Master%20Mix%29.mp3", likes: 0, category: "Pop" },
    { title: "Earth, Wind & Fire Mix Vol. 1", artist: "Earth, Wind & Fire", cover: "Earth, Wind & Fire Mix Vol. 1.jpg", audio: "https://archive.org/download/music-land-proyect/Earth%2C%20Wind%20%26%20Fire%20Mix%20Vol.%201.mp3", likes: 0, category: "Soul" },
    { title: "Earth, Wind & Fire Mix Vol. 2", artist: "Earth, Wind & Fire Mix", cover: "Earth, Wind & Fire Mix Vol. 2.jpg", audio: "https://archive.org/download/music-land-proyect/Earth%2C%20Wind%20%26%20Fire%20Mix%20Vol.%202.mp3", likes: 0, category: "Soul" },
    { title: "Music Land Mix 1", artist: "Jose Luis Yajure", cover: "Music Land Mix 1.jpg", audio: "https://archive.org/download/music-land-proyect/Music%20Land%20Mix%201.mp3", likes: 0, category: "Mix" },
    { title: "Me You", artist: "Agentic Orange", cover: "Me You.jpg", audio: "https://archive.org/download/music-land-proyect/Agentic%20Orange%20-%20Me%20%2B%20You%20%28JLY%20Edit%20Remix%29.mp3", likes: 0, category: "I.A." },
    { title: "Saturday Fever On Friday Night", artist: "Agentic Orange", cover: "Agentic Orange - Saturday Fever On Friday Night.jpg", audio: "https://archive.org/download/music-land-proyect/Agentic%20Orange%20-%20Saturday%20Fever%20On%20Friday%20Night%20%28JLY%20Edit%20Remix%29.mp3", likes: 0, category: "I.A." },
    { title: "A Woman's Worth", artist: "Michael Jackson", cover: "Michael Jackson - A Woman's Worth.jpg", audio: "https://archive.org/download/music-land-proyect/Michael%20Jackson%20-%20A%20Woman%27s%20Worth%20%28I.A.%29.mp3", likes: 0, category: "I.A." },
    { title: "Guaco Mix Vol. 1", artist: "Guaco", cover: "Guaco Mix Vol. 1.jpg", audio: "https://archive.org/download/music-land-proyect/Guaco%20Mix%20Vol.%201.mp3", likes: 0, category: "Mix" },
    { title: "Guaco Mix Vol. 2", artist: "Guaco", cover: "Guaco Mix Vol. 2.jpg", audio: "https://archive.org/download/music-land-proyect/Guaco%20Mix%20Vol.%202.mp3", likes: 0, category: "Mix" },
    { title: "Guaco Mix Vol. 3", artist: "Guaco", cover: "Guaco Mix Vol. 3.jpg", audio: "https://archive.org/download/music-land-proyect/Guaco%20Mix%20Vol.%203.mp3", likes: 0, category: "Mix" },
    { title: "Merengues Mix 1", artist: "José Luis Yajure", cover: "Merengues Mix 1.jpg", audio: "https://archive.org/download/music-land-proyect/Merengues%20Mix%201.mp3", likes: 0, category: "Mix" },
    { title: "Merengues Mix 2", artist: "José Luis Yajure", cover: "Merengues Mix 2.jpg", audio: "https://archive.org/download/music-land-proyect/Merengues%20Mix%202.mp3", likes: 0, category: "Mix" },
    { title: "Merengues Mix 3", artist: "José Luis Yajure", cover: "Merengues Mix 3.jpg", audio: "https://archive.org/download/music-land-proyect/Merengues%20Mix%203.mp3", likes: 0, category: "Mix" },
    { title: "Merengues Mix 4", artist: "José Luis Yajure", cover: "Merengues Mix 4.jpg", audio: "https://archive.org/download/music-land-proyect/Merengues%20Mix%204.mp3", likes: 0, category: "Mix" },
    { title: "Merengues Mix 5", artist: "José Luis Yajure", cover: "Merengues Mix 5.jpg", audio: "https://archive.org/download/music-land-proyect/Merengues%20Mix%205.mp3", likes: 0, category: "Mix" },
    { title: "Podcast 2 2021", artist: "Studio79", cover: "S79 podcast 2 2021.jpg", audio: "https://archive.org/download/music-land-proyect/Studio79%20Podcast%202%20S79%202021.mp3", likes: 0, category: "Podcast" },
    { title: "Cielo Tenebroso", artist: "Dimensión Latina", cover: "Cielo Tenebroso.jpg", audio: "https://archive.org/download/jazztabueno-programa-8-smooth-jazz-1-2025/Cielo%20Tenebroso.mp3", likes: 0, category: "Salsa" },
    { title: "De Ti Enamorado", artist: "Oscar D' León", cover: "De Ti Enamorado.jpg", audio: "https://archive.org/download/jazztabueno-programa-8-smooth-jazz-1-2025/De%20Ti%20Enamorado.mp3", likes: 0, category: "Salsa" },
    { title: "In The End", artist: "Linkin Park", cover: "In The End.jpg", audio: "https://archive.org/download/jazztabueno-programa-8-smooth-jazz-1-2025/In%20The%20End.mp3", likes: 0, category: "Rock" },
    { title: "Smooth Jazz 1", artist: "Jazztabueno", cover: "Jazztabueno Programa 8 Smooth Jazz 1 2025.jpg", audio: "https://archive.org/download/jazztabueno-programa-8-smooth-jazz-1-2025/Jazztabueno%20Programa%208%20Smooth%20Jazz%201%202025.mp3", likes: 0, category: "Podcast" },
    { title: "Lágrimas", artist: "La Inmensidad", cover: "Lágrimas.jpg", audio: "https://archive.org/download/jazztabueno-programa-8-smooth-jazz-1-2025/Lagrimas.mp3", likes: 0, category: "Salsa" },
    { title: "More Than A Feeling", artist: "Boston", cover: "More Than A Feeling.jpg", audio: "https://archive.org/download/jazztabueno-programa-8-smooth-jazz-1-2025/More%20Than%20A%20Feeling.mp3", likes: 0, category: "Rock" },
    { title: "Pour Sugar On Me", artist: "Deff Leppard", cover: "Pour Sugar On Me.jpg", audio: "https://archive.org/download/jazztabueno-programa-8-smooth-jazz-1-2025/Pour%20Sugar%20On%20Me.mp3", likes: 0, category: "Rock" },
    { title: "The Unforgiven", artist: "Metallica", cover: "The Unforgiven.jpg", audio: "https://archive.org/download/jazztabueno-programa-8-smooth-jazz-1-2025/The%20Unforgiven.mp3", likes: 0, category: "Rock" },
    { title: "Yo Puedo Vivir Del Amor", artist: "Willie Colón & Rubén Blades", cover: "Yo Puedo Vivir Del Amor.jpg", audio: "https://archive.org/download/jazztabueno-programa-8-smooth-jazz-1-2025/Yo%20Puedo%20Vivir%20Del%20Amor.mp3", likes: 0, category: "Salsa" },
    { title: "Mañana Vas A Llorar", artist: "Los Nietos", cover: "Mañana Vas A Llorar.jpg", audio: "https://archive.org/download/how-deep-is-your-love_202511/Ma%C3%B1ana%20Vas%20A%20Llorar.mp3", likes: 0, category: "Merengue" },
    { title: "Ruth", artist: "Richie Ray & Bobby Cruz", cover: "Ruth.jpg", audio: "https://archive.org/download/how-deep-is-your-love_202511/Ruth.mp3", likes: 0, category: "Salsa" },
    { title: "Sin Querer Evitarlo (Me Estoy Enamorando De Tí)", artist: "Frank Quintero", cover: "Sin Querer Evitarlo.jpg", audio: "https://archive.org/download/how-deep-is-your-love_202511/Sin%20Querer%20Evitarlo%20%28Me%20Estoy%20Enamorando%20De%20T%C3%AD%29.mp3", likes: 0, category: "Baladas" },
    { title: "Todo Por Su Amor", artist: "Luis Miguel", cover: "Todo Por Su Amor.jpg", audio: "https://archive.org/download/how-deep-is-your-love_202511/Todo%20Por%20Su%20Amor.mp3", likes: 0, category: "Latin" },
    { title: "Your Heart Keeps Burning", artist: "Blind Date", cover: "Your Heart Keeps Burning.jpg", audio: "https://archive.org/download/how-deep-is-your-love_202511/Your%20Heart%20Keeps%20Burning.mp3", likes: 0, category: "Pop" },
    { title: "How Deep Is Your Love", artist: "Bee Gees", cover: "How Deep Is Your Love.jpg", audio: "https://archive.org/download/how-deep-is-your-love_202511/How%20Deep%20Is%20Your%20Love.mp3", likes: 0, category: "Baladas" },
    { title: "Atracción Fatal", artist: "Guaco", cover: "Atraccion Fatal.jpg", audio: "https://archive.org/download/proyecto-uno-como-tu-no-hay-dos/Guaco%20-%20Atracci%C3%B3n%20Fatal.mp3", likes: 0, category: "De Todo Un Poco" },
    { title: "Disculpame Pero Perdóname", artist: "Guaco", cover: "Disculpáme Pero Perdoname.jpg", audio: "https://archive.org/download/proyecto-uno-como-tu-no-hay-dos/Guaco%20-%20Disculpame%20Pero%20Perd%C3%B3name.mp3", likes: 0, category: "De Todo Un Poco" },
    { title: "La Fiesta", artist: "Los Blanco", cover: "La Fiesta.jpg", audio: "https://archive.org/download/proyecto-uno-como-tu-no-hay-dos/LOS%20BLANCO%20LA%20FIESTA.mp3", likes: 0, category: "Clásicos Bailables" },
    { title: "Si Tu Me Miras", artist: "Many Cruz", cover: "Si Tu Me Miras.jpg", audio: "https://archive.org/download/proyecto-uno-como-tu-no-hay-dos/Manny%20Cruz%20-%20Si%20T%C3%BA%20Me%20Miras.mp3", likes: 0, category: "Merengue" },
    { title: "Como Tu No Hay Dos", artist: "Proyecto Uno", cover: "Como Tu No Hay Dos.jpg", audio: "https://archive.org/download/proyecto-uno-como-tu-no-hay-dos/Proyecto%20Uno%20-%20Como%20Tu%20No%20Hay%20Dos.mp3", likes: 0, category: "Merengue" },
    { title: "Mishale", artist: "Andru Donals", cover: "Mishale.jpg", audio: "https://archive.org/download/proyecto-music-land-app/Andru%20Donals%20-%20Mishale.mp3", likes: 0, category: "Pop" },
    { title: "Wanna Be With You", artist: "Earth, Wind & Fire", cover: "Wanna Be With You.jpg", audio: "https://archive.org/download/proyecto-music-land-app/Earth%2C%20Wind%20%26%20Fire%20-%20Wanna%20Be%20With%20You.mp3", likes: 0, category: "R&B Soul" },
    { title: "It's too late", artist: "Gloria Estefan", cover: "It's too late.jpg", audio: "https://archive.org/download/proyecto-music-land-app/Gloria%20Estefan%20-%20It%27s%20too%20late.mp3", likes: 0, category: "Pop" },
    { title: "Sands Of Time", artist: "S.O.S. Band", cover: "Sands Of Time.jpg", audio: "https://archive.org/download/proyecto-music-land-app/S.O.S.%20Band%20-%20Sands%20Of%20Time.mp3", likes: 0, category: "R&B Soul" },
    { title: "Advice For The Young At Heart", artist: "Tears For Fears", cover: "Advice For The Young At Heart.jpg", audio: "https://archive.org/download/proyecto-music-land-app/Tears%20For%20Fears%20-%20Advice%20For%20The%20Young%20At%20Heart.mp3", likes: 0, category: "Pop" },
    { title: "Smooth Vintage", artist: "Soul & Funk Groove Feat. Adam Hosmatt", cover: "Smooth Vintage.jpg", audio: "https://archive.org/download/back-to-1981-soul-funk-groove-smooth-vintage-r-b-nights-oldon-derrinor/Back%20to%201981%F0%9F%8E%B5%20Soul%20%26%20Funk%20Groove%20-%20Smooth%20Vintage%20R%26B%20Nights%20_%20Oldon%20Derrinor.mp3", likes: 0, category: "I.A." },
    { title: "I'm just a Gentleman", artist: "Eugene Thomas", cover: "I'm just a Gentleman.jpg", audio: "https://archive.org/download/back-to-1981-soul-funk-groove-smooth-vintage-r-b-nights-oldon-derrinor/Eugene%20Thomas%20-%20I%27m%20just%20a%20Gentleman.mp3", likes: 0, category: "I.A." },
    { title: "All Night In Your Love", artist: "Leon Rivers", cover: "All Night In Your Love.jpg", audio: "https://archive.org/download/back-to-1981-soul-funk-groove-smooth-vintage-r-b-nights-oldon-derrinor/Leon%20Rivers%20-%20All%20Night%20in%20Your%20Love%20%28Groove%20Mix%29.mp3", likes: 0, category: "I.A." },
    { title: "Moonlight Rendez Vous", artist: "Lowdii-Beats", cover: "Moonlight Rendez Vous.jpg", audio: "https://archive.org/download/back-to-1981-soul-funk-groove-smooth-vintage-r-b-nights-oldon-derrinor/Lowdii-Beats%20-%20Moonlight%20Rendez%20Vous.mp3", likes: 0, category: "I.A." },
    { title: "I Wanna Say I Love You", artist: "Truand De La Funk", cover: "I Wanna Say I Love You.jpg", audio: "https://archive.org/download/back-to-1981-soul-funk-groove-smooth-vintage-r-b-nights-oldon-derrinor/Truand%20De%20La%20Funk%20-%20I%20Wanna%20Say%20I%20Love%20You.mp3", likes: 0, category: "I.A." },
    { title: "Stop, look before you love", artist: "Ray Parker Jr.", cover: "Stop, look before you love.jpg", audio: "https://archive.org/download/stop-look-before-you-love/Stop%2C%20look%20before%20you%20love.mp3", likes: 0, category: "Baladas" },
    { title: "Stuck on you", artist: "Lionel Richie", cover: "Stuck on you.jpg", audio: "https://archive.org/download/stop-look-before-you-love/Stuck%20on%20you.mp3", likes: 0, category: "Baladas" },
    { title: "Suspicions", artist: "Eddie Rabitt", cover: "Suspicions.jpg", audio: "https://archive.org/download/stop-look-before-you-love/Suspicions.mp3", likes: 0, category: "Baladas" },
    { title: "Til' I love you", artist: "Barbra Streisand & Don Johnson", cover: "Til' I love you.jpg", audio: "https://archive.org/download/stop-look-before-you-love/Til%27%20I%20love%20you.mp3", likes: 0, category: "Baladas" },
    { title: "Two less lonely people in the word", artist: "Air Supply", cover: "Two less lonely people in the word.jpg", audio: "https://archive.org/download/stop-look-before-you-love/Two%20less%20lonely%20people%20in%20the%20word.mp3", likes: 0, category: "Baladas" },
    { title: "Llamarada", artist: "Pepe Aguilar", cover: "Llamarada.jpg", audio: "https://archive.org/download/14-yo-no-se-que-me-paso/01%20LLAMARADA.mp3", likes: 0, category: "Ranchera" },
    { title: "Siempre", artist: "Rocío Dúrcal", cover: "Siempre.jpg", audio: "https://archive.org/download/14-yo-no-se-que-me-paso/04%20SIEMPRE.mp3", likes: 0, category: "Ranchera" },
    { title: "La Media Vuelta", artist: "Luis Miguel", cover: "La Media Vuelta.jpg", audio: "https://archive.org/download/14-yo-no-se-que-me-paso/05%20LA%20MEDIA%20VUELTA.mp3", likes: 0, category: "Ranchera" },
    { title: "El Cigarrillo", artist: "Ana Gabriel", cover: "El Cigarrillo.jpg", audio: "https://archive.org/download/14-yo-no-se-que-me-paso/16%20EL%20CIGARRILLO.mp3", likes: 0, category: "Ranchera" },
{ title: "I Just Might", artist: "Bruno Mars", cover: "I Just Might.jpg", audio: "https://archive.org/download/bruno-mars-i-just-might/Bruno%20Mars%20-%20I%20Just%20Might.mp3", likes: 0, category: "Pop" },
{ title: "Got To Be Real", artist: "Cheryl Lynn", cover: "Got To Be Real.jpg", audio: "https://archive.org/download/ladies-night_202601/Got%20to%20be%20real.mp3", likes: 0, category: "Funk" },
{ title: "Here I'am", artist: "Dynasty", cover: "hereiam.jpg", audio: "https://archive.org/download/ladies-night_202601/Here%20I%27am.mp3", likes: 0, category: "R&B" },
{ title: "Ladies Night", artist: "Kool & The Gang", cover: "Ladies Night.jpg", audio: "https://archive.org/download/ladies-night_202601/Ladies%20night.mp3", likes: 0, category: "R&B" },
{ title: "Let's Groove", artist: "Earth, Wind & Fire", cover: "Let's Groove.jpg", audio: "https://archive.org/download/ladies-night_202601/Let%27s%20groove.mp3", likes: 0, category: "R&B" },
{ title: "Look At Her", artist: "Barry White", cover: "Look At Her.jpg", audio: "https://archive.org/download/ladies-night_202601/Look%20at%20her.mp3", likes: 0, category: "Disco" },
{ title: "Lookin' For Love", artist: "Fat Larry's Band", cover: "Lookin' For Love.jpg", audio: "https://archive.org/download/ladies-night_202601/Looking%20for%20love.mp3", likes: 0, category: "Disco" },
{ title: "PTY (Pretty Young Thing)", artist: "Michael Jakson", cover: "PTY (Pretty Young Thing).jpg", audio: "https://archive.org/download/ladies-night_202601/PYT-Pretty%20Young%20Thing.mp3", likes: 0, category: "Pop" },
{ title: "Stomp!", artist: "The Brothers Johnson", cover: "Stomp!.jpg", audio: "https://archive.org/download/ladies-night_202601/Stomp%21.mp3", likes: 0, category: "R&B" },
{ title: "Tonight", artist: "The Whispers", cover: "Tonight.jpg", audio: "https://archive.org/download/ladies-night_202601/Tonight.mp3", likes: 0, category: "R&B" },
{ title: "Tonihgt's The Night", artist: "Kleeer", cover: "Tonihgt's The Night.jpg", audio: "https://archive.org/download/ladies-night_202601/Tonihgt%27s%20the%20night.mp3", likes: 0, category: "R&B" },
];

const audio = document.getElementById('audio');
const container = document.getElementById('cards-container');
const miniPlayBtn = document.getElementById('play');
const miniProgress = document.getElementById('progress');
const miniCurr = document.getElementById('currTime');
const miniDur = document.getElementById('durTime');
const fullScreen = document.getElementById('full-player-screen');
const fpTitle = document.getElementById('fp-title');
const fpArtist = document.getElementById('fp-artist');
const fpCover = document.getElementById('fp-cover');
const fpPlayBtn = document.getElementById('fp-play');
const fpProgress = document.getElementById('fp-progress');
const fpCurr = document.getElementById('fp-currTime');
const fpDur = document.getElementById('fp-durTime');
const visualizer = document.getElementById('visualizer');
const visualizerFP = document.getElementById('visualizer-fp');
const lyricsScreen = document.getElementById('lyrics-screen');
const lyricsText = document.getElementById('lyrics-text');

let isPlaying = false; 
let index = 0;
let currentPlaylist = songs; 
let isShuffle = false; 

function createCard(song, i) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <div style="position:relative" onclick="event.stopPropagation(); loadSong(${i}); openFullPlayer();">
            <img src="${song.cover}" onerror="this.style.background='#333'">
            <div class="play-hover"><i class="fa-solid fa-play"></i></div>
        </div>
        <div onclick="loadSong(${i})"><h3>${song.title}</h3><p>${song.artist}</p></div>
        <div class="card-actions"><i class="fa-regular fa-heart btn-like"></i></div>
    `;
    return div;
}

function initHome() {
    currentPlaylist = songs; 
    document.getElementById('home-view').classList.remove('hidden');
    document.getElementById('search-results-view').classList.add('hidden');
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.category-btn:first-child').classList.add('active');

    // --- MOSTRAR LAS ÚLTIMAS 30 CANCIONES ---
    const recentSongs = songs.slice().reverse().slice(0, 30); 
    // ----------------------------------------

    const recentContainer = document.getElementById('carousel-recent');
    recentContainer.innerHTML = "";
    recentSongs.forEach(song => {
        recentContainer.appendChild(createCard(song, songs.indexOf(song)));
    });

    fillCarousel('carousel-mix', ['Mix']);
    fillCarousel('carousel-latin', ['Salsa', 'Merengue', 'Latin']);
    fillCarousel('carousel-classics', ['Pop', 'Rock', 'Soul', 'Funk']);
    fillCarousel('carousel-ia', ['I.A.']);
}

function fillCarousel(id, categories) {
    const container = document.getElementById(id);
    container.innerHTML = "";
    songs.forEach((song, i) => {
        if (categories.includes(song.category)) {
            container.appendChild(createCard(song, i));
        }
    });
}

function filterSongs(category, btn) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const grid = document.getElementById('grid-container');
    const home = document.getElementById('home-view');
    const results = document.getElementById('search-results-view');
    
    grid.innerHTML = "";
    home.classList.add('hidden');
    results.classList.remove('hidden');
    
    document.getElementById('search-title').innerText = category === 'all' ? "Todas las Canciones" : category;
    
    if (category === 'all') { 
        currentPlaylist = songs; 
    } else { 
        currentPlaylist = songs.filter(s => s.category === category); 
    }
    
    if(currentPlaylist.length === 0) grid.innerHTML = "<p>No hay canciones.</p>";
    
    currentPlaylist.forEach(song => {
        const globalIndex = songs.indexOf(song);
        grid.appendChild(createCard(song, globalIndex));
    });
}

function resetView() { initHome(); }
function openFullPlayer() { fullScreen.classList.add('active'); }
function closeFullPlayer() { fullScreen.classList.remove('active'); }
function closeMenu() { document.getElementById('sidebar').classList.remove('active'); }
function toggleLyrics() { lyricsScreen.classList.toggle('active'); }

function updateMediaSession(s) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: s.title,
            artist: s.artist,
            artwork: [{ src: s.cover, sizes: '512x512', type: 'image/jpg' }]
        });
    }
}

function loadSong(globalIndex) {
    index = globalIndex;
    const s = songs[index];
    document.getElementById('title').innerText = s.title;
    document.getElementById('artist').innerText = s.artist;
    document.getElementById('cover').src = s.cover;
    fpTitle.innerText = s.title;
    fpArtist.innerText = s.artist;
    fpCover.src = s.cover;
    fullScreen.style.backgroundImage = `url('${s.cover}')`;
    lyricsText.innerText = s.lyrics ? s.lyrics : "Letra no disponible.";
    
    // --- INDICADOR DE CARGA ---
    fpPlayBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>'; 
    // --------------------------

    audio.src = s.audio;
    updateMediaSession(s);
    playSong();
    closeMenu();
}

function playSong() { 
    isPlaying = true; 
    miniPlayBtn.className = "fa-solid fa-circle-pause"; 
    visualizer.classList.add('active'); 
    visualizerFP.classList.add('active');
    audio.play().catch(e=>console.log(e)); 
}
function pauseSong() { 
    isPlaying = false; 
    miniPlayBtn.className = "fa-solid fa-circle-play"; 
    fpPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    visualizer.classList.remove('active'); 
    visualizerFP.classList.remove('active');
    audio.pause(); 
}
function togglePlay() { isPlaying ? pauseSong() : playSong(); }

function toggleShuffle() {
    isShuffle = !isShuffle;
    const shuffleBtn = document.getElementById('btn-shuffle');
    const shuffleBtnFP = document.getElementById('fp-shuffle');
    if (isShuffle) {
        shuffleBtn.classList.add('shuffle-active');
        shuffleBtnFP.classList.add('shuffle-active');
    } else {
        shuffleBtn.classList.remove('shuffle-active');
        shuffleBtnFP.classList.remove('shuffle-active');
    }
}

function nextSong() { 
    const currentSongObj = songs[index];
    let playlistIndex = currentPlaylist.indexOf(currentSongObj);
    
    // Si la canción actual no está en la playlist filtrada (ej. cambiaste de categoría mientras sonaba)
    if (playlistIndex === -1) { 
        currentPlaylist = songs; 
        playlistIndex = currentPlaylist.indexOf(currentSongObj); 
    }

    let nextPlaylistIndex;
    if (isShuffle) {
        nextPlaylistIndex = Math.floor(Math.random() * currentPlaylist.length);
        // Evitar repetir la misma si hay más de 1 canción
        if (currentPlaylist.length > 1 && nextPlaylistIndex === playlistIndex) {
            nextPlaylistIndex = (nextPlaylistIndex + 1) % currentPlaylist.length;
        }
    } else {
        nextPlaylistIndex = (playlistIndex + 1) % currentPlaylist.length;
    }
    
    const nextSongObj = currentPlaylist[nextPlaylistIndex];
    loadSong(songs.indexOf(nextSongObj));
}

function prevSong() { 
    const currentSongObj = songs[index];
    let playlistIndex = currentPlaylist.indexOf(currentSongObj);
    if (playlistIndex === -1) { currentPlaylist = songs; playlistIndex = currentPlaylist.indexOf(currentSongObj); }
    
    let prevPlaylistIndex = (playlistIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    const prevSongObj = currentPlaylist[prevPlaylistIndex];
    loadSong(songs.indexOf(prevSongObj));
}

audio.addEventListener('ended', nextSong);

// --- EVENTOS DE CARGA / BUFFERING ---
audio.addEventListener('waiting', () => {
        fpPlayBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
});
audio.addEventListener('playing', () => {
        fpPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});
// ------------------------------------

miniPlayBtn.onclick = (e) => { e.stopPropagation(); togglePlay(); };
fpPlayBtn.onclick = togglePlay;
document.getElementById('fp-next').onclick = nextSong;
document.getElementById('fp-prev').onclick = prevSong;
document.getElementById('next').onclick = (e) => {e.stopPropagation(); nextSong();};
document.getElementById('prev').onclick = (e) => {e.stopPropagation(); prevSong();};

function format(s) { 
    if(isNaN(s)) return "0:00"; 
    const m=Math.floor(s/60), sc=Math.floor(s%60); 
    return `${m}:${sc<10?'0'+sc:sc}`; 
}

audio.addEventListener('timeupdate', (e) => {
    if(e.target.duration) {
        const pct = (e.target.currentTime / e.target.duration) * 100;
        miniProgress.value = pct; fpProgress.value = pct;
        const c = format(e.target.currentTime); const d = format(e.target.duration);
        miniCurr.innerText = c; miniDur.innerText = d;
        fpCurr.innerText = c; fpDur.innerText = d;
    }
});

miniProgress.addEventListener('input', () => { audio.currentTime = (miniProgress.value * audio.duration) / 100; });
fpProgress.addEventListener('input', () => { audio.currentTime = (fpProgress.value * audio.duration) / 100; });
document.getElementById('volume').oninput = (e) => audio.volume = e.target.value / 100;

document.getElementById('search').addEventListener('input', function(event) {
    const txt = this.value.toLowerCase();
    if(txt.length > 0) {
        document.getElementById('home-view').classList.add('hidden');
        document.getElementById('search-results-view').classList.remove('hidden');
        document.getElementById('search-title').innerText = "Resultados de búsqueda";
        const grid = document.getElementById('grid-container');
        grid.innerHTML = "";
        
        // BÚSQUEDA EN TÍTULO O ARTISTA (DUAL)
        const filtered = songs.filter(s => s.title.toLowerCase().includes(txt) || s.artist.toLowerCase().includes(txt));
        currentPlaylist = filtered; 
        
        filtered.forEach(song => {
            grid.appendChild(createCard(song, songs.indexOf(song)));
        });
    } else {
        resetView();
    }
});

document.getElementById('search').addEventListener('keyup', function(event) {
        if (event.key === "Enter") { closeMenu(); this.blur(); }
});

document.getElementById('btn-playlist').onclick = () => { 
    const n=prompt("Nombre de la nueva playlist:"); 
    if(n) document.getElementById('playlist-list').innerHTML+=`<li>🎵 ${n}</li>`; 

};





