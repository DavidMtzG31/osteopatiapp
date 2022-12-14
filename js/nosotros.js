
    const video = document.getElementById('video');
    console.log(video);

    if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i)|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)|| navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ) {
        console.log('Movil');
        video.setAttribute('width', '320');
    } else {
        console.log('Desktop');
        video.setAttribute('width', '600');
}