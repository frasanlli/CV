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