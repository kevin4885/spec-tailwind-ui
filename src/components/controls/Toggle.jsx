const Toggle = ({ id, color = 'secondary', onChange, value, label, labelRight, ...rest }) => {
  return (
    <div className="flex items-center">
      <label htmlFor={id} className="flex cursor-pointer items-center">
        {!labelRight && <span className="mr-4">{label}</span>}

        <div className="inline-flex relative items-center">
          <input
            type="checkbox"
            checked={!!value}
            id={id}
            className="sr-only peer"
            onChange={(e) => onChange({ id, value: e.target.checked })}
            {...rest}
          />
          <div
            className={`w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-${color}-500 peer-focus:ring-opacity-50 dark:peer-focus:ring-${color}-500 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-${color}-500`}
          ></div>
        </div>
        {labelRight && <span className="ml-4">{label}</span>}
      </label>
    </div>
  );
};

export default Toggle;
