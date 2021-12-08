class Footer
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; Proyecto Final Alvarado Valadez Alejandro Progra Web 2021.
      </p>`;
  }
}

customElements.define("mi-footer", Footer);
