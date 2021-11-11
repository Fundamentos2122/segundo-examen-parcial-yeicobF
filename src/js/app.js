/* -------------------------------- VARIABLES ------------------------------- */
const btnAgregar = document.getElementById("agregar-tarea");
/**
 * Obtenemos el modal y mediante propagaci'on de eventos les damos a cada uno
 * (si hubieran más) la posibilidad de cerrar el modal.
 */
document.getElement
const modales = document.getElementsByClassName("modal");
const target_modal = "target-modal";
/** Clase con la que se ocultan los elementos. */
const hideClass = "hide";

btnAgregar.addEventListener("click", (e) => {
  console.log(e);
  // Si se da click al botón de agregar tweet, hay que abrir el modal.
  openModal(e);
});

/**
 * Función para abrir un modal.
 */
function openModal(e) {
  let modal_selector = e.target.getAttribute(target_modal);

  let modal = document.querySelector(modal_selector);

  modal.classList.toggle(hideClass);
}

function closeModal(e) {
  
}

