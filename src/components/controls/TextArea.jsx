import {forwardRef, useCallback, useEffect, useRef} from 'react';
import BaseInput from './BaseInput';

const TextArea = forwardRef(function (
    {className, maxHeight = 300, autoGrow, onChange, value = '', label, description, messages, ...rest},
    ref,
) {
    const innerRef = useRef(null);

    const setRefs = useCallback(
        (el) => {
            ref && (ref.current = el);
            innerRef.current = el;
        },
        [ref, innerRef],
    );

    const adjustHeight = useCallback(() => {
        if (autoGrow && innerRef?.current) {
            innerRef.current.style.height = '0px';
            const scrollHeight = innerRef.current.scrollHeight + 1;
            innerRef.current.style.height = Math.min(scrollHeight, maxHeight) + 'px';
        }
    }, [autoGrow, maxHeight]);

    useEffect(() => {
        adjustHeight();
    }, [value, adjustHeight]);

    const handleChange = (e) => {
        adjustHeight();
        onChange && onChange(e);
    };


    return (
        <BaseInput className={className} label={label} description={description} messages={messages} value={value}
                   onChange={handleChange} {...rest}>
            <textarea ref={setRefs}  {...rest} />
        </BaseInput>
    );
});

export default TextArea;
