import React, { useState } from 'react';
import './StringCalculator.css';

const StringCalculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const add = (numbers) => {
        if (numbers === "") return 0;

        let delimiter = ","; 
        if (numbers.startsWith("//")) {
            const parts = numbers.split("\n"); 
            delimiter = parts[0].substring(2); 
            numbers = parts[1]; 
        }

        
        const numArray = numbers.split(new RegExp(`[${delimiter}\\n]+`))
            .map(Number)
            .filter(num => num <= 1000); 

        const negatives = numArray.filter(num => num < 0);
        if (negatives.length > 0) {
            throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
        }

        return numArray.reduce((sum, num) => sum + num, 0);
    };

    const handleCalculate = () => {
        try {
            const sum = add(input);
            setResult(sum);
            setError('');
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    const handleReset = () => {
        setResult(null);
        setInput('');
    }

    return (
        <div className="calculator-container">
            <h1>String Calculator</h1>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers here..."
                className="input-area"
            />
            <div className="button-container">
                <button onClick={handleCalculate} className="calculate-button">Calculate</button>
                <button onClick={handleReset} className="reset-button">Reset</button>
            </div>
            {result !== null && <p className="result">Result: {result}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default StringCalculator;
