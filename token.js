// Procesa el token en la URL de redirección
const hash = window.location.hash;
const accessToken = hash
    .substring(1)
    .split('&')
    .find(elem => elem.startsWith('access_token'))
    ?.split('=')[1];

if (accessToken) {
    console.log('Access Token:', accessToken);
    // Guarda el token o úsalo directamente para consumir la API
} else {
    console.error('No se encontró el token de acceso.');
}
