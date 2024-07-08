import React from 'react';

export const Tabs = ({ children, onChange, selected }) => {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div className="border-b border-gray-100 dark:border-gray-700 w-full">
      <div className="flex flex-wrap -mb-px text-center ">
        {React.Children.map(children, (c) =>
          React.cloneElement(c, {
            selected: selected?.toString() || 'NO SELECTION',
            onClick: handleChange,
          }),
        )}
      </div>
    </div>
  );
};

export const Tab = ({ children, value, selected, onClick }) => {
  return (
    <div
      className={
        'inline-flex px-4 py-2 rounded-t-lg select-none border-b-2 group transition-all ease-in-out duration-300 ' +
        (selected && selected === value.toString()
          ? 'text-primary-500 dark:text-opacity-80 dark:border-opacity-60 border-primary-500 active dark:text-primary-500 dark:border-primary-500 group'
          : 'border-transparent hover:text-primary-500 dark:hover:text-primary-500  cursor-pointer')
      }
      onClick={() => onClick(value)}
    >
      {children}
    </div>
  );
};
