import "modal.js";

/**
 * Validar si todos los campos del form tienen contenido.
 */

const indicador_campos_incompletos = ".indicador-campos-incompletos";

const id_btn_guardar_tareas = "guardar-tarea";

const btnGuardarTarea = document.getElementById(id_btn_guardar_tareas);

const todoForm = document.forms["todoList"];

const todoKey = "todoList";

/* -------------------------------- FUNCIONES ------------------------------- */

/** Validar campos de input cuando se quiera guardar la tarea. */
function areInputsValid(todoForm) {
  todoForm.forEach((field) => {
    // Si alguno no está especificado, mostrar un modal.
    // Devolver que si son válidas o no las entradas.
    return field == null || field === "";
  });
}

/**
 * Función para mostrar el modal de que falta alguna input y que no se puede
 * ingresar nada. */
function showMissingInputModal(id_indicador_campos_completos) {
  missingInputModal = document.getElementById(id_indicador_campos_completos);
  missingInputModal.style.display = "block";
}

/* -------------------------- Guardar datos de form ------------------------- */

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
  if (areInputsValid(this)) {
    showMissingInputModal(indicador_campos_completos);
  }
  else {

  }
});
