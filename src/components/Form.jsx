import { createContext, useEffect, useState } from 'react';
import { produce } from 'immer';

const FormContext = createContext({});
const Form = ({ children, onErrorsChange }) => {
    const [formErrors, setFormErrors] = useState({});
    const setErrors = (id, count) => {
        setFormErrors(produce(d => {
            d[id] = count;
        }));
        if (onErrorsChange) {
            let count = 0;
            for (const key in formErrors) {
                count += formErrors[key];
            }
            onErrorsChange(count);
        }
    };
    useEffect(() => {
    }, []);
    return <FormContext.Provider value={{ formErrors, setErrors }}>{children}</FormContext.Provider>;
};

export { Form, FormContext };
