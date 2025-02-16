import { notesData } from './dataNote-API.js';
import './note-item.js';

const noteList = document.querySelector('.note-list');

function showModal() {
    const modal = document.querySelector('.container-modal');
    modal.classList.toggle('active');

    if(modal.classList.contains('active')) {
        const form = modal.querySelector('#form-note');
        const titleInput = form.elements.title;
        const noteInput = form.elements.descriptionContent;
        modal.querySelector('#close-modal').addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('active');
        });

      function generateNoteId() {
          return `notes-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      }

      function generatedDate() {
        return `${new Date().toISOString()}`;
      }
      
      // Fungsi untuk menambahkan catatan baru
      function addNoteToList(title, body) {
        const note = {
            id: generateNoteId(),
            title,
            body,
            createdAt: generatedDate(),
            archived: false
        };
      
        notesData.push(note); // Simpan ke array
      
        const noteItem = document.createElement("note-item");
        noteItem.setAttribute("id", note.id);
        noteItem.setAttribute("title", note.title);
        noteItem.setAttribute("body", note.body);
        noteItem.setAttribute("created-at", note.createdAt);
        noteItem.setAttribute("archived", note.archived);
      
        console.log("CreatedAt Set to:", note.createdAt);
        noteList.appendChild(noteItem);

        console.log(notesData);
      }

        form.addEventListener('submit', (e) => {
            const valueTitle = titleInput.value;
            const noteValue = noteInput.value;

            console.log(`Isi dari Title value : ${valueTitle}, isi dari note value: ${noteValue}`);
            form.reset();
            e.preventDefault(); 
            addNoteToList(valueTitle, noteValue);
        });

        titleInput.addEventListener('change', customValidationUsernameHandler);
        titleInput.addEventListener('invalid', customValidationUsernameHandler);
        titleInput.addEventListener('blur', (event) => {
            // Validasi isi input
            const isValid = event.target.validity.valid;
            const errorMessage = event.target.validationMessage;
          
            const connectedValidationId = event.target.getAttribute('aria-describedby');
            const connectedValidationEl = connectedValidationId
              ? document.getElementById(connectedValidationId)
              : null;
          
            if (connectedValidationEl && errorMessage && !isValid) {
              connectedValidationEl.innerText = errorMessage;
            } else {
              connectedValidationEl.innerText = '';
            }
          });
    } else {
        window.alert(`Telah terjadi error`);
    }
}

const customValidationUsernameHandler = (event) => {
    event.target.setCustomValidity('');
  
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('Wajib diisi.');
      return;
    }
  
    if (event.target.validity.tooShort) {
      event.target.setCustomValidity('Minimal panjang adalah 3 karakter.');
      return;
    }
  
    if (event.target.validity.patternMismatch) {
      event.target.setCustomValidity(
        'Tidak boleh diawali dengan simbol, mengandung white space atau spasi, dan mengandung karakter spesial seperti dolar ($).',
      );
      return;
    }
  };

  // menampilkan ke document
notesData.forEach(({ id, title, body, createdAt, archived }) => {
    const noteItem = document.createElement("note-item");
    noteItem.setAttribute("id", id);
    noteItem.setAttribute("title", title);
    noteItem.setAttribute("body", body);
    noteItem.setAttribute("created-at", createdAt);
    noteItem.setAttribute("archived", archived);
    
    noteList.append(noteItem);
});

  export { showModal };