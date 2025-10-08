console.log("¡Hola mundo!");
console.log(document.title);
const myName = document.getElementById("nombres");
const myButton = document.getElementById("boton");

myButton.addEventListener("click", () => {
  myName.textContent = "Itziar y Haizea";
});
