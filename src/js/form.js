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

/** Obtener tareas del LocalStorage y regresar como JSON. */
function getTareasLocalStorage() {
  const tareasLs = localStorage.getItem(tareasLocalStorageKey);

  return JSON.parse(tareasLs);
}

/** Agregar tarea al LocalStorage como string. */
function addTareaLocalStorage(tareasObj, tarea) {
  tareasObj.push(tarea);

  tareasString = JSON.stringify(tareasObj);
  localStorage.setItem(tareasLocalStorageKey);
}

/** Agrega tarea al DOM. */
function addTareaDom(tareaObj, listaTareasDom) {
  const nuevaTarea = document.createElement("div");
  nuevaTarea.className = "tarea";

  nuevaTarea.innerHTML = `
    <div class="tarea__info">
      <h2 class="tarea__info--title">
        ${tareaObj.titulo}
      </h2>
    `;
  /**
   * Fecha con formato dd/mm/AAAA
   * - La fecha del input se guarda con el formato: AAAA-MM-DD o nada.
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
    nuevaTarea.innerHTML += `
    <time datetime="${tareaObj.fecha}" class="tarea__info--time">
      ${fechaFormatoLocal.day}/${fechaFormatoLocal.month}/${fechaFormatoLocal.year}
    </time>`;
  }
  // Cerrar el tag.
  nuevaTarea.innerHTML += "</div>";
  // Descripción.
  nuevaTarea.innerHTML += `
    <p>${tareaObj.descripcion}</p>
    <div class="tarea__check">
      <input type="checkbox" title="Completada" name="completada" id="">
      <label for="completada">Completada</label>
    </div>
  `;
  listaTareasDom.appendChild(nuevaTarea);
}

/**
 * Guardar una tarea en el LocalStorage.
 */
function guardarTareaLocalStorage() {}

/**
 * Agregar una tarea al DOM. Esto dependerá de si se tiene activo el filtro o
 * no.
 */
function addTareaVisual() {}

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
  } else {
    missingInputModal.style.display = "block";
  }
});
