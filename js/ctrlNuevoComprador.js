import {
    getAuth
  } from "../lib/BDfirebase.js";
  import {
    getString,
    muestraError
  } from "../lib/errorConsol.js";
  import {
    tieneRol
  } from "./seguridad.js";
  import {
    checksRoles,
    guardaComprador,
    selectClientes
  } from "./compradores.js";
  
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  /** @type {HTMLUListElement} */
  const listaRoles = document.
    querySelector("#listaRoles");
  
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/datosFirebase.js").User}
      comprador */
  async function protege(comprador) {
    if (tieneRol(comprador,
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
      formData, "correoelec").trim();
    await guardaComprador(evt,
      formData, id);
  }