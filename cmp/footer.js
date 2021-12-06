class footerr extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /* html */
        `<p>
          &copy; Proyecto final 2021. Alvarado Valadez Alejandro.
        </p>`;
    }
  }
  
  customElements.define("footer", footerr);