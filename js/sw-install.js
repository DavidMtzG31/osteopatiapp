// 3 funciones -> Install, activate, fetch
// No se usa window, se utiliza self
// No se usa document, se utiliza caches
// No se usa localStorage, de utilza fetch

if('serviceWorker' in navigator) {
    console.log('Navegador Compatible');
    console.log('=================================');
    navigator.serviceWorker.register('./sw.js')
        .then (function (registro) {
            console.log('El service worker se ha registrado exitosamente.', registro);
        })
        .catch(function(error) {
            console.log('Falló la instalación', error);
        })
} else {
    console.log('Navegador no compatible');
}


// Función de instalar
const buttonInstall = document.getElementById('installButton');


// https://web.dev/i18n/es/customize-install/

let eventoPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Previene a la mini barra de información que aparezca en smartphones
//   e.preventDefault();
  // Guarda el evento para que se dispare más tarde
  eventoPrompt = e;

  // De manera opcional, envía el evento de analíticos para saber si se mostró la promoción a a instalación del PWA
  console.log(`'beforeinstallprompt' se está ejecutando...`);
});


buttonInstall.addEventListener('click', async () => {
    // Muestre el mensaje de instalación
    eventoPrompt.prompt();
    // Espera a que el usuario responda al mensaje
    const { outcome } = await eventoPrompt.userChoice;
    // De manera opcional, envía analíticos del resultado que eligió el usuario
    console.log(`User response to the install prompt: ${outcome}`);
    // Como ya usamos el mensaje, no lo podemos usar de nuevo, este es descartado
    eventoPrompt = null;
  });