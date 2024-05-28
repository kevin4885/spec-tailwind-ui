import { forwardRef } from 'react';
import BaseInput from './BaseInput';

const DateInput = forwardRef(function (
  { className, value = '', name, onChange, label, description, messages, ...rest },
  ref,
) {
  return (
    <BaseInput
      className={className}
      type="date"
      name={name}
      label={label}
      description={description}
      messages={messages}
      value={value?.toISOString ? value.toISOString().slice(0, 10) : value}
      onChange={onChange}
      {...rest}
    >
      <input {...rest} type="date" ref={ref}></input>
    </BaseInput>
  );
});

export default DateInput;
