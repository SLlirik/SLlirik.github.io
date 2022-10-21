/*jshint esversion: 6 */

document.querySelector('[data-modal=letsTalk]').addEventListener('click', () => {
    document.querySelector('.overlay').style.display='block';
});

document.querySelector('[data-modal=main-page]').addEventListener('click', () => {
    document.querySelector('.overlay').style.display='block';
});


document.querySelector('.modal__close').addEventListener('click', () => {
    document.querySelector('.overlay').style.display='none';
});


