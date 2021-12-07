// @ts-nocheck
import {
    cargaRoles
  } from "../js/seguridad.js";
  import {
    getAuth
  } from "../lib/BDfirebase.js";
  import {
    muestraError
  } from "../lib/errorConsol.js";
  
  class Navegar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /* html */
        `<ul>
          <li>
            <a href="index.html">
              Inicio de Sesion</a>
          </li>
        </ul>`;
      this.ul =
        this.querySelector("ul");
      getAuth().onAuthStateChanged(
        comprador => this.
          cambiaUsuario(comprador),
        muestraError);
    }
  
    /**
     * @param {import(
        "../lib/datosFirebase.js").User}
        comp */
        async cambiaComprador(comp) {
          if (comp && comp.email) {
            let html = "";
            const roles =
              await cargaRoles(
                comp.email);
            /* Enlaces para solo
             * para clientes. */
            if (roles.has("Cliente")) {
              html += /* html */
                `<li>
                  <a href=
                    "chat.html">Chat</a>
                </li>`;
            }
            /* Enlaces para solo
             * administradores.
             */
            if (roles.has(
              "Administrador")) {
              html += /* html */
                `<li>
                  <a href="clientes.html">Alumnos</a>
                </li>
                <li>
                  <a href="compradores.html">Usuarios</a>
                </li>`;
            }
            this.ul.innerHTML += html;
          }
        }
      }
  
  
  customElements.define("navegacion", Navegar);