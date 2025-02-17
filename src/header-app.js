class NotesHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="brand-container">
          <a href="#">Notes App</a>
        </div>
        <div class="add-note">
          <a href="#" id="add-button">
            <i class="fa-solid fa-plus"></i> Add note
          </a>
        </div>
      </header>
    `;
  }
}

customElements.define("notes-header", NotesHeader);