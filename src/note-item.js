class NoteItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
  
      this.handleArchive = this.handleArchive.bind(this);
      this.handleUnarchive = this.handleUnarchive.bind(this);
    }
  
    connectedCallback() {
      this.render();
      this.attachEventListeners();
    }
  
    static get observedAttributes() {
      return ["id", "title", "body", "created-at", "archived"];
    }
  
    attributeChangedCallback() {
      this.render();
      this.attachEventListeners();
    }
  
    handleArchive() {
      this.setAttribute("archived", "true");
      document.querySelector("archive-list").appendChild(this);
    }
  
    handleUnarchive() {
      this.setAttribute("archived", "false");
      document.querySelector(".note-list").appendChild(this);
    }
  
    attachEventListeners() {
      const archiveBtn = this.shadowRoot.querySelector(".archive-btn");
      const unarchiveBtn = this.shadowRoot.querySelector(".unarchive-btn");
  
      if (archiveBtn) {
        archiveBtn.addEventListener("click", this.handleArchive);
      }
  
      if (unarchiveBtn) {
        unarchiveBtn.addEventListener("click", this.handleUnarchive);
      }
    }
  
    render() {
      const id = this.getAttribute("id") || "";
      const title = this.getAttribute("title") || "Untitled Note";
      const body = this.getAttribute("body") || "";
      const createdAt = this.getAttribute("created-at") || "Unknown Date";
      const isArchived = this.getAttribute("archived") === "true";
  
      this.shadowRoot.innerHTML = `
              <style>
                  .list-notes {
                      box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
                      border-radius: 10px;
                      padding: .75em;
                      transition: all 300ms;
                      height: 90%;
                  }
                  .list-notes:hover {
                      background-color: #d4d4d4;
                  }
                  .title-note {
                      font-size: 1.2em;
                      font-weight: bold;
                      color: #2B2B2B;
                  }
                  .date {
                      font-style: italic;
                      text-align: end;
                      color: #919191;
                      margin-top: 5px;
                      font-size: .8em;
                  }
                  .btn {
                      display: inline-block;
                      margin-block: 10px;
                      padding: 5px 10px;
                      background-color: #007bff;
                      color: white;
                      border: none;
                      border-radius: 5px;
                      cursor: pointer;
                      font-size: 0.9em;
                  }
              </style>
  
              <div class="list-notes" data-noteid="${id}">
                  <h3 class="title-note">${title}</h3>
                  <div class="body-note">
                      <p>${body}</p>
                      <p class="date">${createdAt}</p>
                  </div>
                  ${!isArchived ? `<button class="btn archive-btn">Arsipkan</button>` : `<button class="btn unarchive-btn">Kembalikan</button>`}
              </div>
          `;
    }
  }
  
  customElements.define("note-item", NoteItem);
  
  class ArchiveList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
  
      this.shadowRoot.innerHTML = `
        <style>
        :host {
          display: block;
          width: 100%;
          margin-top: 20px;
        }
        .archive-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
          padding: 15px;
          border: 2px dashed #007bff;
          border-radius: 10px;
          background-color: #f8f9fa;
        }
        .archive-title {
          grid-column: 1 / -1;
          font-size: 1.5em;
          font-weight: bold;
          color: #2B2B2B;
          text-align: center;
          margin-bottom: 10px;
        }
      </style>

      <div class="archive-container">
        <p class="archive-title">📂 Arsip Note</p>
        <slot></slot>
      </div>
      `;
    }
  }
  customElements.define("archive-list", ArchiveList);
  