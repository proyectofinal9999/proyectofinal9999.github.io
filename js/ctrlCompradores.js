import {
    getAuth,
    getFirestore
  } from "../lib/BDfirebase.js";
  import {
    urlStorage
  } from "../lib/storage.js";
  import {
    cod,
    muestraError
  } from "../lib/errorConsol.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  /** @type {HTMLUListElement} */
  // @ts-ignore
  const lista = document.
    querySelector("#lista");
  const firestore = getFirestore();
  const daoRol = firestore.
    collection("Rol");
  const daoCliente = firestore.
    collection("Cliente");
  const daoComprador = firestore.
    collection("Comprador");
  
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/datosFirebase.js").User}
      comprador */
  async function protege(comprador) {
    if (tieneRol(comprador,
      ["Administrador"])) {
      consulta();
    }
  }
  
  function consulta() {
    daoComprador.onSnapshot(
      htmlLista, errConsulta);
  }
  
  /**
   * @param {import(
      "../lib/datosFirebase.js").
      QuerySnapshot} snap */
  async function htmlLista(snap) {
    let html = "";
    if (snap.size > 0) {
      /** @type {
            Promise<string>[]} */
      let compradores = [];
      snap.forEach(doc => compradores.
        push(htmlFila(doc)));
      const htmlFilas =
        await Promise.all(compradores);
      /* Junta el todos los
       * elementos del arreglo en
       * una cadena. */
      html += htmlFilas.join("");
    } else {
      html += /* html */
        `<li class="vacio">
          No hay compradores
          registrados. 
        </li>`;
    }
    lista.innerHTML = html;
  }
  
  /**
   * @param {import(
      "../lib/datosFirebase.js").
      DocumentSnapshot} doc */
  async function htmlFila(doc) {
    /**
     * @type {import("./tipos.js").
                        Comprador} */
    const data = doc.data();
    const img = cod(
      await urlStorage(doc.id));
    const cliente =
      await buscaCliente(
        data.idCliente);
    const roles =
      await buscaRoles(data.rolIds);
    const parámetros =
      new URLSearchParams();
    parámetros.append("id", doc.id);
    return (/* html */
      `<li>
        <a class="fila conImagen"
            href=
      "usuario.html?${parámetros}">
          <span class="marco">
            <img src="${img}"
              alt="Falta el Avatar">
          </span>
          <span class="texto">
            <strong
                class="primario">
              ${cod(doc.id)}
            </strong>
            <span
                class="secundario">
              ${cliente}<br>
              ${roles}
            </span>
          </span>
        </a>
      </li>`);
  }
  
  /** Recupera el html de un
   * alumno en base a su id.
   * @param {string} id */
  async function
    buscaCliente(id) {
    if (id) {
      const doc =
        await daoCliente.
          doc(id).
          get();
      if (doc.exists) {
        /**
         * @type {import(
            "./tipos.js").
              Cliente} */
        const data = doc.data();
        return (/* html */
          `${cod(data.nombre)}`);
      }
    }
    return " ";
  }
  
  /** Recupera el html de los
   * roles en base a sus id
   * @param {string[]} ids */
  async function buscaRoles(ids) {
    let html = "";
    if (ids && ids.length > 0) {
      for (const id of ids) {
        const doc = await daoRol.
          doc(id).
          get();
        /**
         * @type {
        import("./tipos.js").Rol} */
        const data = doc.data();
        html += /* html */
          `<em>${cod(doc.id)}</em>
          <br>
          ${cod(data.descripción)}
          <br>`;
      }
      return html;
    } else {
      return "Sin Roles";
    }
  }
  
  /** @param {Error} e */
  function errConsulta(e) {
    muestraError(e);
    consulta();
  }