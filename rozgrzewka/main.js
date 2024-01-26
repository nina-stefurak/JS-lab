document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.querySelector('#input-container');
    const przeliczBtn = document.querySelector("#przelicz");
    const wynik = document.querySelector("#wyniki");

    function przelicz() {
        const inputs = inputContainer.querySelectorAll('input[type="number"]');
        const numbers = Array.from(inputs).map(input => parseFloat(input.value) || 0);

        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }

        const average = numbers.length ? sum / numbers.length : 0;
        const min = numbers.length ? Math.min(...numbers) : 0;
        const max = numbers.length ? Math.max(...numbers) : 0;

        wynik.textContent = `Suma: ${sum}, max: ${max}, min: ${min}, średnia: ${average}.`;
    }

    document.querySelector('#add-field').addEventListener('click', () => {
        const fieldWrapper = document.createElement('div');
        const newField = document.createElement('input');
        newField.type = 'number';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Usuń';
        deleteButton.onclick = function() {
            inputContainer.removeChild(fieldWrapper);
            przelicz();
        };

        fieldWrapper.appendChild(newField);
        fieldWrapper.appendChild(deleteButton);
        inputContainer.appendChild(fieldWrapper);

        newField.addEventListener('change', przelicz);
    });

    przeliczBtn.addEventListener("click", przelicz);
});













const numbers = [1, 2, 3, 4];


//methot 1: Using forEach() loop
let sum1 = 0;
numbers.forEach(i => sum1 += i);
console.log('sum1 = ' + sum1);


//method 2: Using reduce() method
const sum2 = numbers.reduce((sum, val) => sum + val, 0 );
console.log('sum2 = ' + sum2);


///reduce
const result = numbers.reduce((sum, value) => {
    return sum + value;
})
console.log('sum reduce = ' + result);



//method 3: Using eval() function not recomended
const sum3 = eval(numbers.join("+"));
console.log('sum3 = ' + sum3);



//method 4: for loop
let sum4 = 0;

for(let i = 0; i < numbers.length; i++){
    sum4 += numbers[i]
}
console.log('sum4 = ' + sum4);
