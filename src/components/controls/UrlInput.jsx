import { forwardRef, useState } from 'react';
import BaseInput from './BaseInput';

const UrlInput = forwardRef(function (
  { className, requireSecure, onChange, label, description, messages, value = '', ...rest },
  ref,
) {
  const [innerMessages, setInnerMessages] = useState([]);

  const handleChange = (e) => {
    let msgs = [];
    let value = e.value;
    if (value) {
      //eslint-disable-next-line no-useless-escape
      const secRegEx = /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
      //eslint-disable-next-line no-useless-escape
      const unsecRegEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
      let isValid = unsecRegEx.test(value);
      let isSecure = secRegEx.test(value);

      if (!isValid) {
        if (secRegEx.test('https://' + value)) {
          value = 'https://' + value;
          isValid = true;
          isSecure = true;
        }
      }

      if (!isValid) msgs.push({ message: 'This url is invalid.', type: 'danger' });
      else if (isValid && !isSecure && requireSecure)
        msgs.push({ message: 'You must enter a secure URL (https).', type: 'danger' });
      else msgs.push({ message: 'This url is valid.', type: 'success' });
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
      onChange={handleChange}
      value={value}
      {...rest}
    >
      <input type="text" {...rest} ref={ref} />
    </BaseInput>
  );
});

export default UrlInput;
