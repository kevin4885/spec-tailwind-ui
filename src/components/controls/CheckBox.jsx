import React from "react";

const CheckBox = ({ children, isStacked, color = "tertiary", value, onChange, ...rest }) => {
  return (
    <ConditionalWrapper condition={isStacked}>
      <label className={`inline-flex items-center mr-6 ${rest.disabled && "text-gray-500 dark:text-gray-500"}`}>
        <input onChange={e => onChange && onChange(e.target.checked)} className={`accent-${color}-500 dark:accent-${color}-500 static self-center align-middle mr-1`} checked={!!value} {...rest} type="checkbox" />
        <span className="ml-1">{children}</span>
      </label>
    </ConditionalWrapper>
  );
};

export const CheckboxGroup = ({ children, isStacked }) => {
  const newChildren = children.map(child => React.cloneElement(child, { isStacked: isStacked }));

  return <div className="mt-5">{newChildren}</div>;
};

const ConditionalWrapper = ({ condition, children }) => {
  if (condition) {
    return <div>{children}</div>;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export default CheckBox;
