const aInput = document.getElementById("a");
const bInput = document.getElementById("b");
const cInput = document.getElementById("c");
const dInput = document.getElementById("d");

function przelicz() {
  const a = parseInt(aInput.value);
  const b = parseInt(bInput.value);
  const c = parseInt(cInput.value);
  const d = parseInt(dInput.value);

  const sum = a + b + c + d;
  const average = (a + b + c + d) / 4;
  const min = Math.min(a, b, c, d);
  const max = Math.max(a, b, c, d);

  //wpisywanie wartości do elementu
  const wynik = document.querySelector("#wyniki");
  wynik.textContent = "Suma: " + sum + ", ";
  wynik.textContent += "max: " + max + ", ";
  wynik.textContent += "min: " + min + ", ";
  wynik.textContent += "average: " + average + ". ";
}
//reagowanie na zdarzenia
const przeliczBtn = document.querySelector("#przelicz");
przeliczBtn.addEventListener("click", () => {
  przelicz();
});

aInput.addEventListener("change", (value) => {
  przelicz();
});
bInput.addEventListener("change", (value) => {
  przelicz();
});
cInput.addEventListener("change", (value) => {
  przelicz();
});
dInput.addEventListener("change", (value) => {
  przelicz();
});
