import { forwardRef, useState } from 'react';
import BaseInput from './BaseInput';
import parsePhoneNumber from 'libphonenumber-js';

const PhoneInput = forwardRef(function (
  { className, value = '', onChange, label, description, messages, ...rest },
  ref,
) {
  const [innerMessages, setInnerMessages] = useState([]);

  const handleChange = (e, doFormat) => {
    let msgs = [];
    let value = e.value;
    if (value) {
      const phoneNumber = parsePhoneNumber(value, 'US');
      if (phoneNumber) {
        if (!phoneNumber.isPossible()) {
          msgs.push({ message: 'Invalid phone number.', type: 'danger' });
        } else {
          if (!phoneNumber.isValid()) msgs.push({ message: 'This phone number may be invalid.', type: 'warn' });
          else {
            msgs.push({ message: 'This phone number is valid.', type: 'success' });
            if (doFormat) value = phoneNumber.format('NATIONAL', { nationalPrefix: false });
          }
        }
      } else {
        msgs.push({ message: 'Invalid phone number', type: 'danger' });
      }
    }
    setInnerMessages(msgs);

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
      <input
        type="tel"
        {...rest}
        className={`${value && value.includes('867-5309') && 'animate-pulse'}`}
        onBlur={(e) => handleChange(e, true)}
        ref={ref}
      />
    </BaseInput>
  );
});

export default PhoneInput;
