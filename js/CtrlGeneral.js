import {
    getAuth,
    getFirestore
  } from "../lib/bdFirebase.js";
  import {
    eliminaStorage,
    urlStorage
  } from "../lib/storage.js";
  import {
    muestraError
  } from "../lib/errorConsol.js";
  import {
    muestraGenerales
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  import {
    checksRoles,
    guardaGeneral,
    selectClientes
  } from "./usuarios.js";
  
  const params =
    new URL(location.href).
      searchParams;
  const id = params.get("id");
  const daoGeneral = getFirestore().
    collection("General");
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
      "../lib/datosFire.js").User}
      general */
  async function protege(general) {
    if (tieneRol(general,
      ["Administrador"])) {
      busca();
    }
  }
  
  async function busca() {
    try {
      const doc = await daoGeneral.
        doc(id).
        get();
      if (doc.exists) {
        const data = doc.data();
        forma.electronico.value = id || "";
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
      muestraGenerales();
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    await guardaGeneral(evt,
      new FormData(forma), id);
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoGeneral.
          doc(id).delete();
        await eliminaStorage(id);
        muestraGenerales();
      }
    } catch (e) {
      muestraError(e);
    }
  }