import { COLOR, COLOR_TYPE } from '../../theme/constants.js';

const Toggle = ({ id, color = 'primary', onChange, value, label, labelRight, ...rest }) => {
    const getColorClasses = () => {
        let focusClass = '';
        switch (color) {
            case COLOR.BLUE:
                focusClass = `peer-checked:bg-blue-500 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-500 peer-checked:after:bg-white`;
                break;
            case COLOR.RED:
                focusClass = `peer-checked:bg-red-500 peer-focus:ring-red-500 dark:peer-focus:ring-red-500 peer-checked:after:bg-white`;
                break;
            case COLOR.ORANGE:
                focusClass = `peer-checked:bg-orange-500 peer-focus:ring-orange-500 dark:peer-focus:ring-orange-500 peer-checked:after:bg-white`;
                break;
            case COLOR.AMBER:
                focusClass = `peer-checked:bg-amber-500 peer-focus:ring-amber-500 dark:peer-focus:ring-amber-500 peer-checked:after:bg-white`;
                break;
            case COLOR.YELLOW:
                focusClass = `peer-checked:bg-yellow-500 peer-focus:ring-yellow-500 dark:peer-focus:ring-yellow-500 peer-checked:after:bg-black`;
                break;
            case COLOR.LIME:
                focusClass = `peer-checked:bg-lime-500 peer-focus:ring-lime-500 dark:peer-focus:ring-lime-500 peer-checked:after:bg-black`;
                break;
            case COLOR.GREEN:
                focusClass = `peer-checked:bg-green-500 peer-focus:ring-green-500 dark:peer-focus:ring-green-500 peer-checked:after:bg-white`;
                break;
            case COLOR.EMERALD:
                focusClass = `peer-checked:bg-emerald-500 peer-focus:ring-emerald-500 dark:peer-focus:ring-emerald-500 peer-checked:after:bg-white`;
                break;
            case COLOR.TEAL:
                focusClass = `peer-checked:bg-teal-500 peer-focus:ring-teal-500 dark:peer-focus:ring-teal-500 peer-checked:after:bg-white`;
                break;
            case COLOR.CYAN:
                focusClass = `peer-checked:bg-cyan-500 peer-focus:ring-cyan-500 dark:peer-focus:ring-cyan-500 peer-checked:after:bg-white`;
                break;
            case COLOR.SKY:
                focusClass = `peer-checked:bg-sky-500 peer-focus:ring-sky-500 dark:peer-focus:ring-sky-500 peer-checked:after:bg-white`;
                break;
            case COLOR.INDIGO:
                focusClass = `peer-checked:bg-indigo-500 peer-focus:ring-indigo-500 dark:peer-focus:ring-indigo-500 peer-checked:after:bg-white`;
                break;
            case COLOR.VIOLET:
                focusClass = `peer-checked:bg-violet-500 peer-focus:ring-violet-500 dark:peer-focus:ring-violet-500 peer-checked:after:bg-white`;
                break;
            case COLOR.PURPLE:
                focusClass = `peer-checked:bg-purple-500 peer-focus:ring-purple-500 dark:peer-focus:ring-purple-500 peer-checked:after:bg-white`;
                break;
            case COLOR.FUCHSIA:
                focusClass = `peer-checked:bg-fuchsia-500 peer-focus:ring-fuchsia-500 dark:peer-focus:ring-fuchsia-500 peer-checked:after:bg-white`;
                break;
            case COLOR.PINK:
                focusClass = `peer-checked:bg-pink-500 peer-focus:ring-pink-500 dark:peer-focus:ring-pink-500 peer-checked:after:bg-white`;
                break;
            case COLOR.ROSE:
                focusClass = `peer-checked:bg-rose-500 peer-focus:ring-rose-500 dark:peer-focus:ring-rose-500 peer-checked:after:bg-white`;
                break;
            case COLOR_TYPE.PRIMARY:
                focusClass = `peer-checked:bg-primary-500 peer-focus:ring-primary-500 dark:peer-focus:ring-primary-500 peer-checked:after:bg-primarytext-500`;
                break;
            case COLOR_TYPE.SECONDARY:
                focusClass = `peer-checked:bg-secondary-500 peer-focus:ring-secondary-500 dark:peer-focus:ring-secondary-500 peer-checked:after:bg-secondarytext-500`;
                break;
            case COLOR_TYPE.TERTIARY:
                focusClass = `peer-checked:bg-tertiary-500 peer-focus:ring-tertiary-500 dark:peer-focus:ring-tertiary-500 peer-checked:after:bg-tertiarytext-500`;
                break;
            case COLOR_TYPE.DANGER:
                focusClass = `peer-checked:bg-danger-500 peer-focus:ring-danger-500 dark:peer-focus:ring-danger-500 peer-checked:after:bg-dangertext-500`;
                break;
            case COLOR_TYPE.WARN:
                focusClass = `peer-checked:bg-warn-500 peer-focus:ring-warn-500 dark:peer-focus:ring-warn-500 peer-checked:after:bg-warntext-500`;
                break;
            case COLOR_TYPE.SUCCESS:
                focusClass = `peer-checked:bg-success-500 peer-focus:ring-success-500 dark:peer-focus:ring-success-500 peer-checked:after:bg-successtext-500`;
                break;
            default:
                focusClass = "";
                break;
        }
        return focusClass;
    };

    return (
        <div className="flex items-center">
            <label htmlFor={id} className="flex cursor-pointer items-center">
                {!labelRight && label && <span className="mr-4">{label}</span>}

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
                        className={`w-10 h-6  dark:after:bg-gray-300 after:bg-gray-500 bg-gray-300 dark:bg-gray-600 peer-checked:after:bg-opacity-90 rounded-full peer peer-focus:ring-4 dark:peer-focus:ring-opacity-50 peer-focus:ring-opacity-50  peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-1 after:left-[4px] after:rounded-full after:h-4 after:w-4 after:duration-300 after:transition-all dark:border-gray-600 ${getColorClasses()}`}
                    ></div>
                </div>
                {labelRight && label && <span className="ml-4">{label}</span>}
            </label>
        </div>
    );
};

export default Toggle;
