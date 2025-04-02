import React from "react";

const useLocalStorage = <T>({ key, defaultValue }: { key: string; defaultValue: T }) => {
    const [value, setValue] = React.useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error);
            return defaultValue;
        }
    });

    const setValueInLocalStorage = (newValue: T) => {
        try {
            localStorage.setItem(key, JSON.stringify(newValue));
            setValue(newValue);
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [value, setValueInLocalStorage] as const;
};

export default useLocalStorage;
