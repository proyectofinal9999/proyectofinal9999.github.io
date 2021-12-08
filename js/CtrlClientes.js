import {
  getAuth, getFirestore
} from "../lib/bdFirebase.js";
import {
  cod, muestraError
} from "../lib/errorConsol.js";
import {
  tieneRol
} from "./seguridad.js";

/** @type {HTMLUListElement} */
const lista = document.querySelector("#lista");
const daoCliente = getFirestore().collection("Cliente");

getAuth().onAuthStateChanged(protege, muestraError);

/** @param {import(
    "../lib/datosFire.js").User}
    general */
async function protege(general) {
  if (tieneRol(general,["Administrador"])) {
    consulta();
  }
}

function consulta() {
  daoCliente.orderBy("nombre").onSnapshot(htmlLista, errConsulta);
}

/**
 * @param {import(
    "../lib/datosFire.js").
    QuerySnapshot} snap */
function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    snap.forEach(doc => html += htmlFila(doc));
  } else {
    html += /* html */
      `<li class="vacio"> No hay clientes registrados. </li>`;
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
                  Cliente} */
  const data = doc.data();
  const nombre = cod(data.nombre);
  const modcel = cod(data.modcel);
  var fsf= cod(data.fecha);
  var fecha = new Date(fsf);
  var espacio="[   -   ]";
  var dformat = [fecha.getDate()+1, fecha.getMonth()+1, fecha.getFullYear()].join('/');
  const parámetros = new URLSearchParams();
  parámetros.append("id", doc.id);
  return ( /* html */
    `<li>
      <a class="fila" href="cliente.html?${parámetros}">
        <strong class="primario">
          ${nombre} ${modcel} ${dformat}
        </strong>
      </a>
    </li>`);
}

/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}

