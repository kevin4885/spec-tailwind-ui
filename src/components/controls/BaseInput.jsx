import React, { useContext, useEffect, useState } from 'react';
import { ToolTip, TooltipContent, TooltipTrigger } from '../ToolTip.jsx';
import Icon from '../Icon/Icon.jsx';
import { FormContext } from '../Form.jsx';

let lastId = 0;

const BaseInput = ({
  className,
  danger,
  warn,
  success,
  label,
  description,
  onChange,
  value = '',
  messages,
  id,
  children,
  ...rest
}) => {
  const inputId = id || `spec-${++lastId}`;
  const { setErrors } = useContext(FormContext);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleChange = (e) => {
    setIsEmpty(!e.target?.value && rest.required);
    onChange && onChange(e.target);
  };

  useEffect(() => {
    if (id && messages) {
      let cnt = !value && rest.required ? 1 : 0;
      messages.forEach((item) => (!item.type || item.type === 'danger') && cnt++);
      setErrors && setErrors(id, cnt);
    }
  }, [messages, id, setErrors, value, rest.required]);

  if (messages && !danger && !warn && !success) {
    if (isEmpty && rest.required) danger = true;
    messages.forEach((item) => {
      if (!item.type) {
        danger = true;
      } else {
        if (item.type === 'danger') danger = true;
        if (item.type === 'warn') warn = true;
        if (item.type === 'success') success = true;
      }
    });
  }

  const getStatusColor = () => {
    if (danger) return 'danger';
    if (warn) return 'warn';
    if (success) return 'success';
    return 'gray';
  };
  const getMessageIcon = (type) => {
    if (!type || type === 'danger') return 'error';
    if (type === 'warn') return 'warning';
    if (type === 'success') return 'check';
    return 'circle';
  };
  const getMessageColor = (type) => {
    if (!type || type === 'danger') return 'danger';
    if (type === 'warn') return 'warn';
    if (type === 'success') return 'success';
    return 'gray';
  };

  const statusColor = getStatusColor();

  let ringColors =
    'border-gray-400 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:border-opacity-60 focus:border-primary-500 dark:border-opacity-0 dark:ring-opacity-60';
  if (danger || warn || success) {
    ringColors = `border-${statusColor}-500 focus:ring-${statusColor}-500 focus:border-${statusColor}-500`;
  }

  return (
    <div className="flex flex-col items-start w-full gap-2">
      {label && (
        <div>
          <label className={'block flex items-center gap-2 ' + className} htmlFor={inputId}>
            <div className="flex gap-1 items-center">
              {label}
              {rest.required && <span className="text-danger-500">*</span>}
            </div>
            {description && (
              <div className="flex items-center">
                <ToolTip>
                  <TooltipTrigger>
                    <Icon
                      className="text-gray-500 dark:text-gray-400 dark:hover:text-primary-500 hover:text-primary-500"
                      size={16}
                      icon="info_outline"
                    />
                  </TooltipTrigger>
                  <TooltipContent>{description}</TooltipContent>
                </ToolTip>
              </div>
              // <div>
              //   <div className={"text-sm text-gray-500 dark:text-gray-500 block font-thin" + className}>{description}</div>
              // </div>
            )}
          </label>
        </div>
      )}
      {React.cloneElement(children, {
        id: inputId,
        value,
        onChange: handleChange,
        autoComplete: children.props.autoComplete || 'off',
        className: `${children.props.className} focus:outline-none focus:ring-2 border font-thin rounded-md block w-full px-2 py-1 dark:placeholder-gray-500 placeholder-gray-500 text-gray-950 dark:text-gray-50 bg-white  dark:bg-gray-700 
            disabled:text-gray-500 disabled:bg-gray-50 disabled:border-gray-300 disabled:dark:bg-gray-800 disabled:dark:border-gray-700 disabled:dark:text-gray-500 disabled:ring-transparent ${ringColors}`,
      })}
      {((messages && messages.length > 0) || (isEmpty && rest.required)) && (
        <div className="flex ml-2">
          <ul>
            {isEmpty && rest.required && (
              <li className={`flex items-center text-sm text-${getMessageColor('danger')}-500`}>
                <Icon className="mr-2" icon={getMessageIcon('danger')} size={14} />
                {label} is required.
              </li>
            )}
            {messages &&
              messages.length > 0 &&
              messages.map((m) => {
                let msg = m.message || m;
                return (
                  <li key={msg} className={`flex items-center text-sm text-${getMessageColor(m.type)}-500`}>
                    <Icon className="mr-2" icon={getMessageIcon(m.type)} size={14} />
                    {msg}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BaseInput;
