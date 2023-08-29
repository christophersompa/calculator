const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-display');

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        // When a user hits a number key
        if(!action){
            if(displayedNum === '0' || previousKeyType === 'operator'){
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        }

        // When a user hits the decimal key
        if(action === 'decimal'){
            display.textContent = displayedNum + '.';
        }
    
        // When a user hits an opertor key
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ){
            key.classList.add('is-depressed');
            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator';
        }

         // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

        if(action === 'calculate'){
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            display.textContent = calculate(firstValue, operator, secondValue);
        }

        const calculate = (n1, operator, n2) => {
            let result = ''

            if(operator === 'add'){
                result = parseInt(n1) + parseInt(n2);
            } else if(operator === 'subtract'){
                result = parseInt(n1) - parseInt(n2);
            } else if(operator === 'multiply'){
                result = parseInt(n1) * parseInt(n2);
            } else if(operator === 'divide'){
                result = parseInt(n1) / parseInt(n2);
            }
            return result;
        }
    }
})
