/**
 * Variables de las clases
 * - Para evitar conflictos con las mismas variables en diferentes archivos.
 */

const class_show = "show";
/**
 * Clase para mostrar un elemento con `display: none` para que se convierta en
 * `display: flex`.
 */
const class_show_flex = "show-flex";

/**
 * Cerrar modal obteniendo el botón de cerrar como parámetro. Vamos subiendo de
 * de nivel de nodo hasta llegar al modal padre y quitar la clase `show`.
 *
 * Esta se utiliza en varios archivos.
 */
function closeModal(button, showClass = class_show) {
  modal_header = button.parentNode;
  modal_content = modal_header.parentNode;

  // Quitar indicador de que faltan campos si es que lo tiene.
  // console.log(modal_content.children);

  // Recorrer los hijos hasta llegar al botón para quitar la clase.
  // modal-content > modal-body > indicador-campos-incompletos
  modal_body = modal_content.children["modal-body"];

  // console.log(modal_body);
  indicador = modal_body.children["indicador-campos-incompletos"];
  // Escondemos el elemento si es que existe.
  indicador.style.display = "none";

  // Array.from(children)
  //   .filter((e) => e.classList.contains("modal-body"))
  //   .filter((e) => e.classList.contains("indicador-campos-completos"))
  //   .classList.toggle("show");

  modal = modal_content.parentNode;

  // modal.classList.toggle(class_show);
  modal.classList.toggle(showClass);
}

// Exportamos para utilizar en otros archivos.
export { class_show, class_show_flex, closeModal };
