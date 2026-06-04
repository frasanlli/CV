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

function changeSlide(step) {
  const slides = document.querySelectorAll(".promo-card");
  let currentIndex = 0;

  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("active")) {
      currentIndex = i + step;
      break;
    }
  }

  if (currentIndex >= slides.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }

  slides.forEach(slide => slide.classList.remove("active"));
  slides[currentIndex].classList.add("active");
}

async function cargarPagina(btn) {
  const allTabs = document.querySelectorAll(".tab");
  allTabs.forEach(tab => tab.classList.remove("activo"));
  btn.classList.add("activo");

  const nombre = btn.dataset.page;
  const respuesta = await fetch(`pages/${nombre}.html`);

  const html = await respuesta.text();

  app.innerHTML = html;
  await i18n.apply();

}

const app = document.querySelector("main.panel");
  const btn_proyectos = document.querySelector("button[data-page='proyectos']");

document.addEventListener("DOMContentLoaded", async () => {
  await i18n.init();
  cargarPagina(btn_proyectos);
});

document.getElementById("langSelect").addEventListener("change", async (e) => {
  await i18n.changeLanguage(e.target.value);
  i18n.apply();
});

document.querySelectorAll("button").forEach(btn => {

  btn.addEventListener("click", () => {
    if (btn.dataset.page){
      cargarPagina(btn);
    }
  });

});



