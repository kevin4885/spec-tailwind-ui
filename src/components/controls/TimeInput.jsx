import { forwardRef } from "react";
import BaseInput from "./BaseInput";

const TimeInput = forwardRef(function ({ className, name, onChange, value = "", label, description, messages, ...rest }, ref) {
  return (
    <BaseInput className={className} type="text" name={name} label={label} description={description} messages={messages} {...rest}>
      <input {...rest} type="time" value={value} onChange={onChange} ref={ref}></input>
    </BaseInput>
  );
});

export default TimeInput;
