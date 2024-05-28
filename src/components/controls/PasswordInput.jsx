import { forwardRef } from 'react';
import BaseInput from './BaseInput';

const PasswordInput = forwardRef(function (
  { className, placeholder, onChange, value = '', label, description, messages, ...rest },
  ref,
) {
  return (
    <BaseInput
      className={className}
      label={label}
      description={description}
      onChange={onChange}
      value={value}
      messages={messages}
      {...rest}
    >
      <input type="password" placeholder={placeholder} {...rest} ref={ref} />
    </BaseInput>
  );
});

export default PasswordInput;
