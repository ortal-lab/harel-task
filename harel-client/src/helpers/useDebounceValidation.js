import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useAsync } from 'react-async-hook';
import useConstant from 'use-constant';
import {useState} from 'react';

const useDebounceValidation = (validationFunction) => {

    // Handle the input text state
    const [inputText, setInputText] = useState('');
  
    // Debounce the original search async function
    const debouncedValidationFunction = useConstant(() =>
      AwesomeDebouncePromise(validationFunction, 300)
    );
  
    // The async callback is run each time the text changes,
    // but as the search function is debounced, it does not
    // fire a new request on each keystroke
    const isValid = useAsync(
      async () => {
        if (inputText.length === 0) {
          return true;
        } else {
          return debouncedValidationFunction(inputText);
        }
      },
      [debouncedValidationFunction, inputText]
    );
  
    // Return everything needed for the hook consumer
    return [
      inputText,
      setInputText,
      isValid,
    ];
  };
  export default useDebounceValidation