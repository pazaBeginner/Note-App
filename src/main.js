import { showModal } from './input-data.js';
// import './note-item.js'
document.querySelector('#add-button').addEventListener('click', () => {
    showModal();
});

document.querySelector('.btn-add').addEventListener('click', () => {
    showModal();
});

document.querySelector('footer p span.date').innerText = new Date().getFullYear();
