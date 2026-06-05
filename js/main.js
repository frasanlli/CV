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

function getActiveIndex(querySelectorAll, activeClass, step){
  const searchedElements = document.querySelectorAll(querySelectorAll);
  let currentIndex = 0;
  for (let i = 0; i < searchedElements.length; i++) {
    if (searchedElements[i].classList.contains(activeClass)) {
      currentIndex = i + step;
      break;
    }
  }
  if (currentIndex >= searchedElements.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = searchedElements.length - 1;
  }
  return currentIndex;
}

function changeSlide(step) {
  const querySlides = ".promo-card"
  const activeClass = "active"
  const searchedElements = document.querySelectorAll(querySlides);
  const currentIndex = getActiveIndex(querySlides, activeClass, step);
  searchedElements.forEach(searchedElement => searchedElement.classList.remove(activeClass));
  searchedElements[currentIndex].classList.add(activeClass);
  void searchedElements[currentIndex].offsetWidth;
}

function changeTab(){
  const querySlides = ".tab"
  const activeSlide = "activo"
  const searchedElements = document.querySelectorAll(querySlides);
  const currentIndex = getActiveIndex(querySlides, activeSlide, 1);
  console.log(searchedElements[currentIndex].tagName)
  if (searchedElements[currentIndex].tagName != "BUTTON"){
    loadPage(searchedElements[0])
  }else{
    loadPage(searchedElements[currentIndex])
  }
}

async function loadPage(btn) {
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
  loadPage(btn_proyectos);
});

document.getElementById("langSelect").addEventListener("change", async (e) => {
  await i18n.changeLanguage(e.target.value);
  i18n.apply();
});

document.querySelectorAll("button").forEach(btn => {
  if (btn.dataset.page){
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("activo")){
        loadPage(btn);
      }
    });
  }
});


document.addEventListener("keydown", function(event) {
  //console.log(event.key.toLowerCase())
  switch (event.key.toLowerCase()) {
    case "arrowright":
      document.getElementById("next").click();
      break;

    case "arrowleft":
      document.getElementById("prev").click();
      break;

    case "tab":
      changeTab()
      break;
  }
});
