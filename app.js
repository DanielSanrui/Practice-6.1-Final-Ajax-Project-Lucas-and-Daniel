const clientId = '22764d228fb54fdfa21eb2a61587689a';
//const clientIdSecret = '25ee73e99a014fc69d5d04f578622bbf';

const redirectUri = 'http://localhost:3000'; // Cambia a tu URL
const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
];

// Redirige al usuario a la página de autenticación de Spotify
function authenticateWithSpotify() {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes.join('%20')}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = authUrl;
}

// Llama a esta función en un botón o evento específico
document.getElementById('loginButton').addEventListener('click', authenticateWithSpotify);
