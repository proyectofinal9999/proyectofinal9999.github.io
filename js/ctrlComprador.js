import {
    getAuth,
    getFirestore
  } from "../lib/BDfirebase.js";
  import {
    eliminaStorage,
    urlStorage
  } from "../lib/storage.js";
  import {
    muestraError
  } from "../lib/errorConsol.js";
  import {
    muestraCompradores
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  import {
    checksRoles,
    guardaComprador,
    selectClientes
  } from "./compradores.js";
  
  const params =
    new URL(location.href).
      searchParams;
  const id = params.get("id");
  const daoComprador = getFirestore().
    collection("Comprador");
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  const img = document.
    querySelector("img");
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
      busca();
    }
  }
  
  async function busca() {
    try {
      const doc = await daoComprador.
        doc(id).
        get();
      if (doc.exists) {
        const data = doc.data();
        forma.cue.value = id || "";
        img.src =
          await urlStorage(id);
        selectClientes(
          forma.idCliente,
          data.idCliente)
        checksRoles(
          listaRoles, data.rolIds);
        forma.addEventListener(
          "submit", guarda);
        forma.eliminar.
          addEventListener(
            "click", elimina);
      }
    } catch (e) {
      muestraError(e);
      muestraCompradores();
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    await guardaComprador(evt,
      new FormData(forma), id);
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoComprador.
          doc(id).delete();
        await eliminaStorage(id);
        muestraCompradores();
      }
    } catch (e) {
      muestraError(e);
    }
  }