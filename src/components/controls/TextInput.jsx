import {forwardRef} from 'react';
import BaseInput from './BaseInput';

const TextInput = forwardRef(function (
  { className, placeholder, onChange, value = '', label, description, messages, ...rest },
  ref,
) {
    return (
        <BaseInput
            label={label}
            description={description}
            messages={messages}
            value={value}
            onChange={onChange}
            {...rest}
        >
            <input type="text" placeholder={placeholder} className={className}  {...rest} ref={ref}/>
    </BaseInput>
  );
});

export default TextInput;
