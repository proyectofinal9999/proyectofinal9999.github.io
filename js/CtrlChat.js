import {
  getAuth, getFirestore
} from "../lib/bdFirebase.js";
import {
  cod, getString, muestraError
} from "../lib/errorConsol.js";
import {
  tieneRol
} from "./seguridad.js";

const daoMensaje = getFirestore().
  collection("Mensaje");
let idGeneral = "";
/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLUListElement} */
const lista = document.
  querySelector("#lista");

getAuth().onAuthStateChanged(protege, muestraError);

/** @param {import(
    "../lib/datosFire.js").User}
    general */
async function protege(general) {
  if (tieneRol(general,["Cliente"])) {
    idGeneral = general.email;
    consulta();
    forma.addEventListener("submit", agrega);
  }
}

/** 
 * @param {Event} evt */
async function agrega(evt) {
  try {
    evt.preventDefault();
    const formData = new FormData(forma);
    /** @type {string} */
    const texto = getString(formData, "texto").trim();
    const timestamp =
      // @ts-ignore
      firebase.firestore.FieldValue.serverTimestamp();
    /** @type {import(
        "./tipos.js").Mensaje} */
    const modelo = {
      idGeneral, texto, timestamp
    };

    /*"Mensaje". */
    await daoMensaje.add(modelo);
    forma.texto.value = "";
  } catch (e) {
    muestraError(e);
  }
}

function consulta() {
  daoMensaje.
    orderBy("timestamp", "desc").
    onSnapshot(htmlLista, errConsulta);
}

/** 
 * @param {import(
    "../lib/datosFire.js").
    QuerySnapshot} snap 
 */
function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    snap.forEach(doc =>
      html += htmlFila(doc));
  } else {
    html += /* html */
      `<li class="vacio">
        No hay mensajes registrados. 
      </li>`;
  }
  lista.innerHTML = html;
}

/** 
 * @param {import(
    "../lib/datosFire.js").
    DocumentSnapshot} doc */
function htmlFila(doc) {
  /**
   * @type {import("./tipos.js").
                      Mensaje} */
  const data = doc.data();
  return ( /* html */
    `<li class="fila">
      <strong class="primario">
        ${cod(data.idGeneral)}
      </strong>
      <span class="secundario">
        ${cod(data.texto)}
      </span>
    </li>`);
}

/**
 * @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}
