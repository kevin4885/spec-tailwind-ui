import { forwardRef, useCallback, useRef } from 'react';
import BaseInput from './BaseInput';

const TextArea = forwardRef(function (
  { className, autoGrow, onChange, value = '', label, description, messages,  ...rest },
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

  const handleChange = (e) => {
    if (autoGrow && innerRef?.current) {
      innerRef.current.style.height = '0px';
      const scrollHeight = innerRef.current.scrollHeight;
      innerRef.current.style.height = scrollHeight + 'px';
    }
    onChange && onChange({ value: e.target?.value, messages: [], event: e, hasErrors: false });
  };

  return (
    <BaseInput className={className} label={label} description={description} messages={messages} {...rest}>
      <textarea ref={setRefs} value={value} onChange={handleChange} {...rest} />
    </BaseInput>
  );
});

export default TextArea;
