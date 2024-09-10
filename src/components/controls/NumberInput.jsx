import { forwardRef, useState } from 'react';
import BaseInput from './BaseInput';

const NumberInput = forwardRef(function (
  {
    className,
    onChange,
    value = '',
    min,
    max,
    maxMessage,
    minMessage,
    isDecimal,
    label,
    description,
    messages,
    ...rest
  },
  ref,
) {
  const [innerMessages, setInnerMessages] = useState([]);

  const handleChange = (e) => {
    let msgs = [];
    e.value = e.value.replace(isDecimal ? /[^\d.-]/gm : /[^\d-]/gm, '');

    if (e.value) {
      if (isDecimal && isNaN(e.value)) {
        e.value = parseFloat(e.value);
      }

      if (min !== undefined && Number(e.value) < Number(min))
        msgs.push({
          message: minMessage || 'Number needs to be above ' + min,
          type: 'danger',
        });
      if (max !== undefined && Number(e.value) > Number(max))
        msgs.push({
          message: maxMessage || 'Number needs to be below ' + max,
          type: 'danger',
        });
      setInnerMessages(msgs);
    }

    onChange && onChange(e);
  };

  return (
    <BaseInput
      className={className}
      label={label}
      description={description}
      messages={messages ? [...messages, ...innerMessages] : innerMessages}
      value={value}
      onChange={handleChange}
      {...rest}
    >
      <input type="text" {...rest} ref={ref} />
    </BaseInput>
  );
});

export default NumberInput;
