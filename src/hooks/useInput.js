//! Custom Hook must start with (use)

import {useState} from "react";

export function useInput(defaultValue, validationFns) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);

    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFns.every(
        fn => fn(enteredValue)
    );

    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setDidEdit(false)
    }

    function handleInputBlur() {
        setDidEdit(true)
    }

    return {
        value: enteredValue,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid
    };
}