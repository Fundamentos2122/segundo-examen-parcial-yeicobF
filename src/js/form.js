/**
 * Validar si todos los campos del form tienen contenido.
 */

const indicador_campos_incompletos = "info-campos-incompletos";

const id_btn_guardar_tareas = "guardar-tarea";

const btnGuardarTarea = document.getElementById(id_btn_guardar_tareas);

const todoForm = document.forms["todoList"];

/** Obtener inputs. */
const inputs = document.querySelectorAll(
  '#formulario input[name="titulo"], #formulario textarea[name="descripcion"]',
);

/** Modal que indica que faltan campos. */
const missingInputModal = document.getElementById(indicador_campos_incompletos);

/** Modal que indica que los campos están bien. */
const completeInputModal = document.getElementById("info-campos-completos");

/** Llave del LocalStorage. */
const tareasLocalStorageKey = "tareas";

/** Filtro para ver todos los elementos en pantalla. */
const filtroVerTodos = document.getElementById("filtro-ver-todos");

/* ---------------------------- OBJETOS DEL FORM ---------------------------- */

/** Indicador de validez de los campos. */
const camposValidos = {
  titulo: false,
  descripcion: false,
};

/* -------------------------------- FUNCIONES ------------------------------- */
/**
 * Cerrar modal obteniendo el botón de cerrar como parámetro. Vamos subiendo de
 * de nivel de nodo hasta llegar al modal padre y quitar la clase `show`.
 */
function closeModal(button) {
  modal_header = button.parentNode;
  modal_content = modal_header.parentNode;

  // Quitar indicador de que faltan campos si es que lo tiene.
  console.log(modal_content.children);
  // Recorrer los hijos hasta llegar al botón para quitar la clase.
  // modal-content > modal-body > indicador-campos-incompletos
  modal_body = modal_content.children["modal-body"];
  console.log(modal_body);
  indicador = modal_body.children["indicador-campos-incompletos"];
  // Escondemos el elemento si es que existe.
  indicador.style.display = "none";

  // Array.from(children)
  //   .filter((e) => e.classList.contains("modal-body"))
  //   .filter((e) => e.classList.contains("indicador-campos-completos"))
  //   .classList.toggle("show");

  modal = modal_content.parentNode;

  modal.classList.toggle(class_show);
}

/** Validar si un input es válido o no. */
function validarInput(input, campo) {
  // Hacer trim en el input para quitar los espacios.
  input = input.value.trim();
  if (input == null || input === "") {
    camposValidos[campo] = false;
  } else {
    camposValidos[campo] = true;
  }
}

/** Agregamos validación al dejar de escribir y al dar click fuera del input. */
inputs.forEach((input) => {
  // Al dejar de teclear.
  input.addEventListener("keyup", (e) => {
    validarInput(e.target, e.target.name);
  });
  // Al dar click fuera de la pantalla.
  input.addEventListener("blur", (e) => {
    validarInput(e.target, e.target.name);
  });
});

/**
 * Función para mostrar el modal de que falta alguna input y que no se puede
 * ingresar nada. */
function showMissingInputModal(id_indicador_campos_completos) {
  missingInputModal = document.getElementById(id_indicador_campos_completos);
  missingInputModal.style.display = "block";
}

/* ------------------------------ LocalStorage ------------------------------ */
/* -------------------------- Guardar datos de form ------------------------- */

/** Obtener tareas del form. */
function getDatosTareaForm() {
  // Crear un ID basado en tiempo.
  // https://stackoverflow.com/a/40591207/13562806
  const id = Date.now() + Math.random();
  const titulo = todoForm["titulo"].value;
  const descripcion = todoForm["descripcion"].value;
  const fecha = todoForm["fecha"].value;
  // Cuando declaramos el objeto con atributos de variables inicializadas, no se
  // tienen que asignar explícitamente. Se hace implícito.
  return (tareaObj = {
    id,
    titulo,
    descripcion,
    fecha,
    // Inicializar que la tarea no esté completada.
    completada: false,
  });
}

/** Obtener tareas del LocalStorage y regresar como JSON. */
function getTareasLocalStorage() {
  const tareasLs = localStorage.getItem(tareasLocalStorageKey);
  // Si el parse no es null, se utiliza su valor. Si sí es null, inicializar
  // arreglo vacío.
  const tareasArray = JSON.parse(tareasLs) ?? [];
  return tareasArray;
}

/** Agregar tarea al LocalStorage como string. */
function saveTareaLocalStorage(tareasObj, tarea) {
  tareasObj.push(tarea);

  tareasString = JSON.stringify(tareasObj);
  localStorage.setItem(tareasLocalStorageKey, tareasString);
}

/** Agrega tarea al DOM. */
function addTareaDom(tareaObj, listaTareasDom) {
  const nuevaTarea = document.createElement("div");
  // Mostrar la tarea si no está completada (a menos que tenga el filtro).
  // Mostrar como tarea completada si lo está. Esto cambiará el color de fondo.
  let classes = `tarea ${
    !tareaObj.completada ? "show-flex" : "tarea__completada"
  }`;

  // Mostrar elemento si se que el filtro está activo y no tiene ya la clase.
  if (
    filtroVerTodos.getAttribute("checked") &&
    !classes.includes("show-flex")
  ) {
    classes += "show-flex";
  }

  nuevaTarea.className = classes;
  /**
   * Cadena con todo el HTML para ponerlo en innerHTML al final ya que esté
   * todo formado. Si se pone el innerHTML en partes, se cierran automáticamente
   * las etiquetas, ya que necesita un HTML formado.
   */
  let strInnerHTML = `
    <div class="tarea__info">
      <h2 class="tarea__info--title">
        ${tareaObj.titulo}
      </h2>
    `;
  /**
   * Fecha con formato dd/mm/AAAA
   * - La fecha del input se guarda con el formato: AAAA-MM-DD o nada.
   *
   * Solo agregar fecha si se especificó.
   */
  if (tareaObj.fecha) {
    // Generar array de tamaño 3.
    [year, month, day] = tareaObj.fecha.split("-");
    // Definir objeto con los valores que utilizamos.
    fechaFormatoLocal = {
      year,
      month,
      day,
    };
    // Solo agregar el tiempo si es que lo hay.
    strInnerHTML += `
    <time datetime="${tareaObj.fecha}" class="tarea__info--time">
      ${fechaFormatoLocal.day}/${fechaFormatoLocal.month}/${fechaFormatoLocal.year}
    </time>`;
  }
  // Cerrar el tag.
  strInnerHTML += "</div>";
  // Descripción.
  strInnerHTML += `
    <p>${tareaObj.descripcion}</p>
    <div class="tarea__check">
      <input ${
        tareaObj.completada ? "checked" : ""
      } type="checkbox" title="Completada" name="completada" id="">
      <label for="completada">Completada</label>
    </div>
  `;

  // Poner el innerHTML con la cadena ya formada.
  nuevaTarea.innerHTML = strInnerHTML;
  listaTareasDom.appendChild(nuevaTarea);
}

/**
 * Haz todo el procedimiento de obtención de tweets, añadirlos al DOM y todo
 * eso.
 */
function procedimientoAgregarTarea() {
  const tarea = getDatosTareaForm();
  const tareasObj = getTareasLocalStorage();

  saveTareaLocalStorage(tareasObj, tarea);
  // Obtener lista de tareas actual.
  const tareasActualesDom = document.getElementById("lista-tareas");
  addTareaDom(tarea, tareasActualesDom);
}

/* ------------------------------ GUARDAR TAREA ----------------------------- */

/** Agregar evento a botón de guardar datos. */
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Los campos son correctos.
  if (camposValidos.titulo && camposValidos.descripcion) {
    camposValidos.descripcion = false;
    camposValidos.titulo = false;

    // console.log(e.target);
    // Ocultar modal, pero esperar un momento.
    missingInputModal.style.display = "none";
    // Mostrar mensaje de que se ingresaron los datos correctamente.
    completeInputModal.style.display = "block";
    setTimeout(() => {
      // Ocultamos el indicador de que fue correcto el input.
      completeInputModal.style.display = "none";
      // Reiniciar formulario.
      todoList.reset();
      // Cerramos el modal una vez guardado. Esperar n segundos.
      closeModal(e.target);
    }, 3000);

    // Agregar tarea al LocalStorage y al DOM.
    procedimientoAgregarTarea();
  } else {
    missingInputModal.style.display = "block";
  }
});

/* ------------------- CARGAR TAREAS AL ENTRAR A LA PÁGINA ------------------ */

/** Cargar las tareas cuando se inicia la página. */
document.addEventListener("DOMContentLoaded", (e) => {
  // Obtener lista de tareas actual.
  const listaTareas = document.getElementById("lista-tareas");
  // console.log("lista tareas");
  // console.log(listaTareas);

  const tareasObj = getTareasLocalStorage();
  // console.log("tareas obj");
  // console.log(tareasObj);

  // Agregar tareas al DOM.
  tareasObj.forEach((tarea) => addTareaDom(tarea, listaTareas));
});

/* ------------- EVENTO DE CUANDO SE MARCA TAREA COMO COMPLETADA ------------ */
