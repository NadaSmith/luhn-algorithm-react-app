import React, { useState, useEffect } from 'react';

const CreditCardForm = () => {
    //initializing state
    const [cardNumber, setCardNumber] = useState(''); //declares initial state value and setter function 
    const [isValid, setIsValid] = useState(false); //declares intial state value and setter function

    //implementing the luhn algorithm in the helper function
    const isValidCardNumber = (cardNumber) => {
        let sum = 0;
        let isEven = false;
        //removing all non-digit characters
        // (/) = delineates the start of a regular expression
        // (\D) = matches any nondigit characters
        // (/g) = says to apply replacement to entire string and not just stop at first match
        //converts card number to a string, removes all non-digit characters, splits the string into array of individual characters, then reverse array (to iterate through credit card number right to left)
        const digits = cardNumber.toString().replace(/\D/g, '').split('').reverse();

        //for loop to iterate over card number from right to left (start with index of last digit)
        for (let i = 0; i < digits.length; i++) {
        //takes digit at i index and convert it to an integer
        let num = parseInt(digits[i], 10);     

        //if number is even  if odd add integer to sum
        if (isEven) {
            //double the integer 
            const doubled = num * 2;
            //if doubled integer greater than 9 subtract 9 from it and then add to sum, 
            sum += doubled > 9 ? doubled - 9 : doubled;
          //if number odd  
        } else {
            //add original value to sum
            sum += num;
        }
        //toggles btw even and odd
        isEven = !isEven;
        }

        //checks if sum is a multiple of 10, if true then card number is valid
        return sum % 10 === 0;
    };

    //hook runs whenever the cardNumber state changes. Will call the isValidCardNumber to validate number, updates isValid state based on result, and recalculate whenever number changes
    useEffect(() => {
        setIsValid(isValidCardNumber(cardNumber.replace(/\D/g, "")));    // Remove non-digit characters
    }, [cardNumber]);

    const handleChange = (event) => {
        setCardNumber(event.target.value);
    };

    return (
        <div>
            <h1>Nada's React Credit Card Validator</h1>

            <label>
                Enter credit card number:
                <input type="text" value={cardNumber} onChange={handleChange} />
            </label>
            {/*conditional rendering block displaying valid or not valid*/}
            {isValid ? (
                <p>Card is valid.</p>
            ) : (
                <p>Card is not valid.</p>
            )}
        </div>
    );
};

export default CreditCardForm;
