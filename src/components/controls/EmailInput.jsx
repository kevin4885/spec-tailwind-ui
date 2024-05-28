import { forwardRef, useState } from 'react';
import BaseInput from './BaseInput';

const EmailInput = forwardRef(function (
  { className, value = '', onChange, label, description, messages, ...rest },
  ref,
) {
  const [innerMessages, setInnerMessages] = useState([]);

  const checkErrors = (val) => {
    let msgs = [];
    if (val) {
      const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
      if (!isEmail) msgs.push({ message: 'Invalid email.', type: 'danger' });
    }
    setInnerMessages(msgs);
    return msgs;
  };

  const handleChange = (e) => {
    let val = e.value;
    checkErrors(val);
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

export default EmailInput;
