// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-button');
const calculatorSections = document.querySelectorAll('.calculator-section');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and sections
        tabButtons.forEach(btn => btn.classList.remove('active'));
        calculatorSections.forEach(section => section.classList.remove('active'));

        // Add active class to clicked button and corresponding section
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// BMI Calculator
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('Please enter valid weight and height values');
        return;
    }

    // Convert height from cm to meters
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Determine category
    let category = '';
    let categoryClass = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'bmi-underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal weight';
        categoryClass = 'bmi-normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        categoryClass = 'bmi-overweight';
    } else {
        category = 'Obese';
        categoryClass = 'bmi-obese';
    }

    // Display result
    document.getElementById('bmi-value').textContent = bmi.toFixed(1);
    document.getElementById('bmi-category').innerHTML =
        `Category: <span class="bmi-category ${categoryClass}">${category}</span>`;
    document.getElementById('bmi-result').classList.remove('hidden');
}

// Power Converter (kW ↔ PS)
const KW_TO_PS = 1.35962;

function convertFromKW() {
    const kw = parseFloat(document.getElementById('kw-input').value);
    if (kw >= 0) {
        const ps = kw * KW_TO_PS;
        document.getElementById('ps-input').value = ps.toFixed(2);
    }
}

function convertFromPS() {
    const ps = parseFloat(document.getElementById('ps-input').value);
    if (ps >= 0) {
        const kw = ps / KW_TO_PS;
        document.getElementById('kw-input').value = kw.toFixed(2);
    }
}

// Math Calculator
let currentDisplay = '0';
let shouldResetDisplay = false;

function appendToDisplay(value) {
    const display = document.getElementById('calc-display');

    if (shouldResetDisplay) {
        currentDisplay = '';
        shouldResetDisplay = false;
    }

    if (currentDisplay === '0' && value !== '.') {
        currentDisplay = value;
    } else {
        currentDisplay += value;
    }

    display.textContent = currentDisplay;
}

function clearCalculator() {
    currentDisplay = '0';
    shouldResetDisplay = false;
    document.getElementById('calc-display').textContent = currentDisplay;
}

function calculateResult() {
    try {
        // Replace × and ÷ with * and /
        const expression = currentDisplay.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(expression);

        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid calculation');
        }

        currentDisplay = result.toString();
        document.getElementById('calc-display').textContent = result;
        shouldResetDisplay = true;
    } catch (error) {
        document.getElementById('calc-display').textContent = 'Error';
        currentDisplay = '0';
        shouldResetDisplay = true;
    }
}

// Temperature Converter
function convertTemperature(source) {
    const celsiusInput = document.getElementById('celsius');
    const fahrenheitInput = document.getElementById('fahrenheit');
    const kelvinInput = document.getElementById('kelvin');

    let celsius, fahrenheit, kelvin;

    if (source === 'celsius') {
        celsius = parseFloat(celsiusInput.value);
        if (!isNaN(celsius)) {
            fahrenheit = (celsius * 9 / 5) + 32;
            kelvin = celsius + 273.15;
            fahrenheitInput.value = fahrenheit.toFixed(2);
            kelvinInput.value = kelvin.toFixed(2);
        }
    } else if (source === 'fahrenheit') {
        fahrenheit = parseFloat(fahrenheitInput.value);
        if (!isNaN(fahrenheit)) {
            celsius = (fahrenheit - 32) * 5 / 9;
            kelvin = celsius + 273.15;
            celsiusInput.value = celsius.toFixed(2);
            kelvinInput.value = kelvin.toFixed(2);
        }
    } else if (source === 'kelvin') {
        kelvin = parseFloat(kelvinInput.value);
        if (!isNaN(kelvin)) {
            celsius = kelvin - 273.15;
            fahrenheit = (celsius * 9 / 5) + 32;
            celsiusInput.value = celsius.toFixed(2);
            fahrenheitInput.value = fahrenheit.toFixed(2);
        }
    }
}

// Length Converter
function convertLength(source) {
    const metersInput = document.getElementById('meters');
    const feetInput = document.getElementById('feet');
    const inchesInput = document.getElementById('inches');
    const centimetersInput = document.getElementById('centimeters');

    let meters;

    if (source === 'meters') {
        meters = parseFloat(metersInput.value);
    } else if (source === 'feet') {
        const feet = parseFloat(feetInput.value);
        meters = feet * 0.3048;
    } else if (source === 'inches') {
        const inches = parseFloat(inchesInput.value);
        meters = inches * 0.0254;
    } else if (source === 'centimeters') {
        const cm = parseFloat(centimetersInput.value);
        meters = cm / 100;
    }

    if (!isNaN(meters) && meters >= 0) {
        metersInput.value = source === 'meters' ? metersInput.value : meters.toFixed(4);
        feetInput.value = source === 'feet' ? feetInput.value : (meters * 3.28084).toFixed(4);
        inchesInput.value = source === 'inches' ? inchesInput.value : (meters * 39.3701).toFixed(4);
        centimetersInput.value = source === 'centimeters' ? centimetersInput.value : (meters * 100).toFixed(4);
    }
}

// Speed Converter
function convertSpeed(source) {
    const kmhInput = document.getElementById('kmh');
    const mphInput = document.getElementById('mph');
    const msInput = document.getElementById('ms');

    let kmh;

    if (source === 'kmh') {
        kmh = parseFloat(kmhInput.value);
    } else if (source === 'mph') {
        const mph = parseFloat(mphInput.value);
        kmh = mph * 1.60934;
    } else if (source === 'ms') {
        const ms = parseFloat(msInput.value);
        kmh = ms * 3.6;
    }

    if (!isNaN(kmh) && kmh >= 0) {
        kmhInput.value = source === 'kmh' ? kmhInput.value : kmh.toFixed(2);
        mphInput.value = source === 'mph' ? mphInput.value : (kmh / 1.60934).toFixed(2);
        msInput.value = source === 'ms' ? msInput.value : (kmh / 3.6).toFixed(2);
    }
}

// Currency Converter (with approximate exchange rates)
const exchangeRates = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CHF: 0.88
};

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (!amount || amount < 0) {
        document.getElementById('currency-result').classList.add('hidden');
        return;
    }

    // Convert to USD first, then to target currency
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];

    document.getElementById('currency-value').textContent =
        `${convertedAmount.toFixed(2)} ${toCurrency}`;
    document.getElementById('currency-result').classList.remove('hidden');
}

// Keyboard support for calculator
document.addEventListener('keydown', (e) => {
    // Only handle keyboard events when math calculator is active
    if (!document.getElementById('math').classList.contains('active')) return;

    const key = e.key;

    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        e.preventDefault(); // Prevent browser search
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculateResult();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearCalculator();
    } else if (key === 'Backspace') {
        if (currentDisplay.length > 1) {
            currentDisplay = currentDisplay.slice(0, -1);
            document.getElementById('calc-display').textContent = currentDisplay;
        } else {
            clearCalculator();
        }
    }
});
