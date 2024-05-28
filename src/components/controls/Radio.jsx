import React from 'react';
import { ToolTip, TooltipContent, TooltipTrigger } from '../ToolTip.jsx';
import Icon from "../Icon/Icon.jsx";

const Radio = ({ groupName, value, children, isStacked, onChange, ...rest }) => {
  return (
    <ConditionalWrapper condition={isStacked}>
      <label htmlFor={value} className="inline-flex select-none pr-4 py-1">
        <input
          id={value}
          className="static self-center align-middle mr-1"
          {...rest}
          type="radio"
          name={groupName}
          onChange={() => onChange && onChange({ id: groupName, value })}
        />
        {children}
      </label>
    </ConditionalWrapper>
  );
};

export const RadioGroup = ({ groupName, description, isStacked, label, onChange, ...rest }) => {
  const newChildren = rest.children.map((child, i) =>
    React.cloneElement(child, {
      key: groupName + i,
      isStacked: isStacked,
      groupName: groupName,
      onChange: onChange,
    }),
  );

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <div className="flex gap-2 items-center">
        <label className="block flex items-center gap-2">{label}</label>
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
      </div>
      <div className="flex pl-4">{newChildren}</div>
    </div>
  );
};

const ConditionalWrapper = ({ condition, children }) => {
  if (condition) {
    return <div>{children}</div>;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default Radio;
