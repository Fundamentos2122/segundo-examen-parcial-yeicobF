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
const tareasLocalStorageKey = "fdw-second-exam_tareas-por-hacer";

/** Filtro para ver todos los elementos en pantalla. */
const filtroVerTodos = document.getElementById("filtro-ver-todos");

/** Todas las clases con las tareas de la lista. */
let tareasArray = document.querySelectorAll("#lista-tareas > .tarea");

/** Mostrar tareas, pero con `display: flex;`. */
const class_show_tarea = "show-flex";

/** Tarea completada. */
const class_tarea_completada = "tarea__completada";

/** Lista de tareas actual. */
const listaTareas = document.getElementById("lista-tareas");

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
  // Se creaba con un punto en medio, por lo que lo reemplacé con un guión.
  //
  // .toString(36) convierte el número a base 36.
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
  const id = `${Date.now()}-${Math.random()}`.toString(36).replace(".", "");
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
  let tareasArray = JSON.parse(tareasLs) ?? [];
  return tareasArray;
}

/** Agregar tarea al LocalStorage como string. */
function saveTareaLocalStorage(tareasObj, tarea) {
  tareasObj.push(tarea);

  tareasString = JSON.stringify(tareasObj);
  localStorage.setItem(tareasLocalStorageKey, tareasString);
}

/**
 * Actualizar el LocalStorage para indicar si una tarea ya fue terminada o no.
 *
 * Se podría hacer más general, pero al menos por propósitos del ejercicio, solo
 * lo haré con dicha propiedad.
 */
function updateCompletadaLocalStorage(tareasObj, { id, completada }) {
  console.log("Update local storage");
  console.log(id);
  console.log(completada);
  // Buscar tarea para actualizar esa en específico.
  // Vamos a buscar el índice de la que se actualizará.
  const indexTareaActualizar = tareasObj.findIndex((t) => t.id === id);
  console.log(indexTareaActualizar);
  // Reemplazar antigua tarea con la nueva en el índice en donde se encontró.
  if (indexTareaActualizar >= 0) {
    console.log("Se encontró el elemento.");

    tareasObj[indexTareaActualizar]["completada"] = completada;

    tareasString = JSON.stringify(tareasObj);
    localStorage.setItem(tareasLocalStorageKey, tareasString);
  }
}

/** Agrega tarea al DOM. */
function addTareaDom(tareaObj, listaTareasDom) {
  const nuevaTarea = document.createElement("div");
  // - Agregar el id del LocalStorage para que sean únicos y tengan relación con
  //   el Local Storage.
  nuevaTarea.id = tareaObj.id;

  // Mostrar la tarea si no está completada (a menos que tenga el filtro).
  // Mostrar como tarea completada si lo está. Esto cambiará el color de fondo.
  //
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
    }, 1500);

    // Agregar tarea al LocalStorage y al DOM.
    procedimientoAgregarTarea();
  } else {
    missingInputModal.style.display = "block";
  }
});

/* ------------------- CARGAR TAREAS AL ENTRAR A LA PÁGINA ------------------ */

/** Cargar las tareas cuando se inicia la página. */
document.addEventListener("DOMContentLoaded", (e) => {
  // console.log("lista tareas");
  // console.log(listaTareas);

  const tareasObj = getTareasLocalStorage();
  // console.log("tareas obj");
  // console.log(tareasObj);

  // Agregar tareas al DOM.
  tareasObj.forEach((tarea) => addTareaDom(tarea, listaTareas));
});

/* ------------- EVENTO DE CUANDO SE MARCA TAREA COMO COMPLETADA ------------ */

/**
 * Mostrar u ocultar elementos dependiendo del filtro.
 */
filtroVerTodos.addEventListener("change", (e) => {
  /** Todas las clases con las tareas de la lista. */
  tareasArray = document.querySelectorAll("#lista-tareas > .tarea");
  if (e.target.checked) {
    // https://developer.mozilla.org/es/docs/Web/API/NodeList
    // 
    // Convertir NodeList a array para poder iterar y utilizar funciones como
    // filter.
    Array.from(tareasArray)
      // Obtenemos elementos que no tienen clase de mostrar.
      .filter((tarea) => !tarea.classList.contains(class_show_tarea))
      // Agregamos a los elementos sin la clase, la clase.
      .forEach((tareaSinMostrar) =>
        tareaSinMostrar.classList.add(class_show_tarea),
      );
  }
  // No mostrar todos, solo los que no han sido completados.
  else {
  }
});

/**
 * Marcar tarea como completada o desmarcar.
 *
 * Utilizaremos propagación de eventos para solo asignar al contenedor padre y
 * no un evento por tarea. Esto mejora el rendimiento, ya que no existen n
 * eventos, sino solo uno.
 */
listaTareas.addEventListener("change", (e) => {
  let target = e.target;
  // Revisar que se trate del checkbox lo que cambia.
  if (
    target &&
    target.tagName === "INPUT" &&
    target.type === "checkbox" &&
    target.name === "completada"
  ) {
    // https://developer.mozilla.org/es/docs/Web/API/Element/closest
    // Hay que buscar el padre con la clase "tarea" que sea más cercano para
    // cambiar su color de fondo.
    //
    // - Esto se hace con un selector.
    const tarea = target.closest(".tarea");
    // console.log(tarea);

    // Obtener contenido del LocalStorage.
    const tareasObj = getTareasLocalStorage();
    // Buscamos tarea del Local Storage con nuestro mismo ID.
    // ---
    // Buscar nuestro elemento filtrando. El filter devuelve un array, pero no
    // debería haber problema porque es difícil que se genere un id igual a
    // otro. De hecho, podría utilizar `.find`, pero tendría que estar seguro
    // de que solo hay un elemento con este id. No lo puedo dar por hecho (en
    // este caso sí podría ser), ya que si se generan muchos id rápidamente,
    // alguno podría generar el mismo id.
    //
    // - Ya vi que no se pueden utilizar esos métodos con un objeto.
    //
    // tareasObj.find((t) => t.id === tarea.id);

    // Recorremos objeto JSON con los elementos del storage.
    // tareasObj es un arreglo de objetos: [{...}, {...}, {...}]
    // console.log(tareasObj.find((t) => t.id === tarea.id));

    /* for (let key in tareasObj) {
      let currentLsElement = tareasObj[key];
      console.log(currentLsElement);
      if (currentLsElement.id === tarea.id) {
        // Tarea con el mismo ID.
        currentLsElement["completada"] = target.checked;
        // tareaMismoId["completada"] = target.checked;
        break;
      }
    } */

    // Dar el valor del checked al Local Storage.
    // console.log(target);
    // tareaMismoId["completada"] = target.checked;

    // Revisar si se hizo un check o si se quitó.
    if (target.checked) {
      // No hay que revisar si ya contiene la clase, ya que se trata de un set,
      // por lo que no se pueden ingresar valores repetidos.
      //
      // https://stackoverflow.com/a/67352460/13562806
      tarea.classList.add(class_tarea_completada);
      // Hay que esconder el elemento si es que no está el filtro para ver
      // todos.
      if (!filtroVerTodos.checked) {
        tarea.classList.remove(class_show_tarea);
      }
    } else {
      tarea.classList.remove(class_tarea_completada);
    }

    const datosParaActualizarLs = {
      id: tarea.id,
      completada: target.checked,
    };

    // Actualizar el Local Storage.
    updateCompletadaLocalStorage(tareasObj, datosParaActualizarLs);
  }
});
