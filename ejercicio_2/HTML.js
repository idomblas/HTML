const input = document.getElementById("userinput");
const display = document.getElementById("displayText");
const myButton = document.getElementById("boton1");

myButton.addEventListener("click", mostrarTexto);

function mostrarTexto() {
  const valorActual = input.value;
  if (valorActual.trim() !== "") {
    display.textContent = `Has escrito: ${valorActual}`;
  } else {
    display.textContent = "No escribiste nada";
  }
}
