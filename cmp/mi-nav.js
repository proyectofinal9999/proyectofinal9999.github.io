import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/bdFirebase.js";
import {
  muestraError
} from "../lib/errorConsol.js";

class Nav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<ul>
        <li>
          <a href="index.html">
            Inicio de Sesión</a>
        </li>
      </ul>`;
    this.ul =
      this.querySelector("ul");
    getAuth().onAuthStateChanged(
      general => this.
        cambiaGeneral(general),
      muestraError);
  }

  /**
   * @param {import(
      "../lib/datosFire.js").User}
      gen */
  async cambiaGeneral(gen) {
    if (gen && gen.email) {
      let html = "";
      const roles =
        await cargaRoles(
          gen.email);
          
     if (roles.has("Cliente")) {
        html += /* html */
          `<li>
            <a href=
              "chat.html">Chat</a>
          </li>`;
      }
      if (roles.has(
        "Administrador")) {
        html += /* html */
          `<li>
            <a href= "clientes.html">Clientes</a>
          </li>
          <li>
            <a href= "generales.html">Generales</a>
          </li>`;
      }
      this.ul.innerHTML += html;
    }
  }
}

customElements.define("mi-nav", Nav);
