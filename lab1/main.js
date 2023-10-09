function przelicz() {
//pobranie elementu z html
const a = parseInt(document.getElementById('a').value);
const b = parseInt(document.getElementById('b').value);
const c = parseInt(document.getElementById('c').value);
const d = parseInt(document.getElementById('d').value);

const sum = a+b+c+d;
const average =  (a + b + c + d) / 4;
const min = Math.min(a,b,c,d);
const max = Math.max(a,b,c,d);

//wpisywanie wartości do elementu
const wynik = document.querySelector('#wyniki');
wynik.textContent = 'Suma: ' + sum + ', ';
wynik.textContent += 'max: ' + max + ', ';
wynik.textContent += 'min: ' + min + ', ';
wynik.textContent += 'average: ' + average + '. ';

}
//reagowanie na zdarzenia
const przeliczBtn = document.querySelector('#przelicz');
przeliczBtn.addEventListener('click', ()=>{
    przelicz();
})