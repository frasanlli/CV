function imprimirPDF() {
  window.print();
}
function prepararMail() {
  const destinatario = "frasanlli@alu.edu.gva.es";
  const asunto = "Consulta desde la web";
  const cuerpo = "Hola,\n\nQuiero más información.\n\nGracias.";

  const mailto = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

  window.location.href = mailto;
}

const app = document.querySelector("main.panel");
const btn_proyectos = document.querySelector("button[data-page='proyectos']");

async function cargarPagina(btn) {
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach(tab => tab.classList.remove("activo"));
  btn.classList.add("activo");

  const nombre = btn.dataset.page;
  const respuesta = await fetch(`pages/${nombre}.html`);

  const html = await respuesta.text();

  app.innerHTML = html;

}

document.querySelectorAll("button").forEach(btn => {

  btn.addEventListener("click", () => {
    cargarPagina(btn);
  });

});

cargarPagina(btn_proyectos);