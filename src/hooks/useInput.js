import useLocalStorage from "./useLocalStorage";

const useInput = (key, initValue) => {
    const [value, setValue]= useLocalStorage(key, initValue);

    const clear = () => setValue('');

    const attributeObj = {
        value,
        onChange: (e) => setValue(e.target.value)
    }

    return [value, attributeObj, clear]
}

export default useInput;