import {class_show, class_show_flex, closeModal} from "./elementos-generales.js";
// import { class_show_flex, closeModal } from "elementos-generales";

/* -------------------------------- VARIABLES ------------------------------- */
const btnAgregar = document.getElementById("agregar-tarea");
/**
 * Obtenemos el modal y mediante propagación de eventos les damos a cada uno
 * (si hubieran más) la posibilidad de cerrar el modal.
 */
document.getElement;
const modales = document.getElementsByClassName("modal");
const target_modal = "target-modal";
/** Clase con la que se ocultan los elementos. */
const class_hide = "hide";

/* const class_show = "show";
// Mostrar modal como flex para centrar elementos en pantalla.
const class_show_flex = "show-flex"; */

/**
 * Función para abrir un modal. Le pasamos el modal al que pertenece el evento.
 */
function openModal(e, showClass = class_show) {
  let modal_selector = e.target.getAttribute(target_modal);
  let modal = document.querySelector(modal_selector);
  // console.log("modal_selector" + modal_selector);
  // console.log(modal);
  // modal.classList.toggle(class_show);
  modal.classList.toggle(showClass);
}



btnAgregar.addEventListener("click", (e) => {
  // console.log(e);
  // Si se da click al botón de agregar tweet, hay que abrir el modal.
  openModal(e, (showClass = class_show_flex));
});

/**
 * Cerrar modal
 *
 */
Array.from(modales).forEach((modal) => {
  // console.log("Modal" + modal);
  modal.addEventListener("click", (e) => {
    // Si se presiona el botón para cerrar o guardar modal.
    // console.log("Click cerrar modal evento: " + e.target);
    // console.log("Modal" + this);
    if (
      e.target &&
      e.target.tagName === "BUTTON" &&
      e.target.classList.contains("modal-header__close-button")
    ) {
      // Pasamos el modal para luego acceder al padre y cerrarlo.
      closeModal(e.target, (showClass = class_show_flex));
    }
  });
});
