const aInput = document.getElementById("a");
const bInput = document.getElementById("b");
const cInput = document.getElementById("c");
const dInput = document.getElementById("d");

function przelicz() {
  const a = parseFloat(aInput.value) || 0;
  const b = parseFloat(bInput.value) || 0;
  const c = parseFloat(cInput.value) || 0;
  const d = parseFloat(dInput.value) || 0;

  const sum = a + b + c + d;
  const average = (a + b + c + d) / 4;
  const min = Math.min(a, b, c, d);
  const max = Math.max(a, b, c, d);

  //wpisywanie wartości do elementu
  const wynik = document.querySelector("#wyniki");
  wynik.textContent = `Suma: ${sum}, max: ${max}, min: ${min}, średnia: ${average}.`;
}
//reagowanie na zdarzenia
const przeliczBtn = document.querySelector("#przelicz");
przeliczBtn.addEventListener("click", () => {
  przelicz();
});

[aInput, bInput, cInput, dInput].forEach(input => {
  input.addEventListener("change", przelicz);
});
