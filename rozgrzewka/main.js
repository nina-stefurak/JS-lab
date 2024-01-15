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
