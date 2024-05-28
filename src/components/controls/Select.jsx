import { forwardRef } from 'react';
import BaseInput from './BaseInput';

const Select = forwardRef(function (
  { className, name, value, onChange, label, description, messages, children, ...rest },
  ref,
) {
  return (
    <BaseInput
      className={className}
      type="text"
      value={value}
      onChange={onChange}
      name={name}
      label={label}
      description={description}
      messages={messages}
      {...rest}
    >
      <select {...rest} ref={ref}>
        {children}
      </select>
    </BaseInput>
  );
});

export default Select;
