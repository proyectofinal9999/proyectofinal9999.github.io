import {
    getAuth
  } from "../lib/bdfirebase.js";
  import {
    getString,
    muestraError
  } from "../lib/errorConsol.js";
  import {
    tieneRol
  } from "./seguridad.js";
  import {
    checksRoles,
    guardaGeneral,
    selectClientes
  } from "./usuarios.js";
  
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  /** @type {HTMLUListElement} */
  const listaRoles = document.
    querySelector("#listaRoles");
  
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/datosFire.js").User}
      general */
  async function protege(general) {
    if (tieneRol(general,
      ["Administrador"])) {
      forma.addEventListener(
        "submit", guarda);
      selectClientes(
        forma.idCliente, "");
      checksRoles(listaRoles, []);
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    const formData =
      new FormData(forma);
    const id = getString(
      formData, "electronico").trim();
    await guardaGeneral(evt,
      formData, id);
  }