import { forwardRef } from 'react';
import { COLOR, COLOR_TYPE } from '../../theme/constants.js';


const Button = forwardRef(function({
                                       className,
                                       children,
                                       noStyle = false,
                                       link,
                                       type = 'button',
                                       color = 'primary',
                                       outline,
                                       loading,
                                       loadingText,
                                       onClick,
                                       ...rest
                                   }, ref) {


    const getColorClasses = () => {
        let focusClass = ""
        switch (color) {
            case "black": focusClass = `focus:ring-black ${link || outline ? "text-black" : "text-white"} bg-black border-black`; break;
            case "white": focusClass = `focus:ring-white ${link || outline ? "text-white" : "text-gray-600"} bg-white border-white`; break;
            case "gray": focusClass = `focus:ring-gray-500 ${link || outline ? "dark:text-gray-300 text-gray-500" : "text-white"} bg-gray-500 border-gray-500`; break;
            case COLOR.BLUE: focusClass = `focus:ring-blue-500 ${link || outline ? "text-blue-500" : "text-white"} bg-blue-500 border-blue-500`; break;
            case COLOR.RED: focusClass = `focus:ring-red-500 ${link || outline ? "text-red-500" : "text-white"} bg-red-500 border-red-500`; break;
            case COLOR.ORANGE: focusClass = `focus:ring-orange-500 ${link || outline ? "text-orange-500" : "text-white"} bg-orange-500 border-orange-500`; break;
            case COLOR.AMBER: focusClass = `focus:ring-amber-500 ${link || outline ? "text-amber-500" : "text-white"} bg-amber-500 border-amber-500`; break;
            case COLOR.YELLOW: focusClass = `focus:ring-yellow-500 ${link || outline ? "text-yellow-500" : "text-black"} bg-yellow-500 border-yellow-500`; break;
            case COLOR.LIME: focusClass = `focus:ring-lime-500 ${link || outline ? "text-lime-500" : "text-black"} bg-lime-500 border-lime-500`; break;
            case COLOR.GREEN: focusClass = `focus:ring-green-500 ${link || outline ? "text-green-500" : "text-white"} bg-green-500 border-green-500`; break;
            case COLOR.EMERALD: focusClass = `focus:ring-emerald-500 ${link || outline ? "text-emerald-500" : "text-white"} bg-emerald-500 border-emerald-500`; break;
            case COLOR.TEAL: focusClass = `focus:ring-teal-500 ${link || outline ? "text-teal-500" : "text-white"} bg-teal-500 border-teal-500`; break;
            case COLOR.CYAN: focusClass = `focus:ring-cyan-500 ${link || outline ? "text-cyan-500" : "text-white"} bg-cyan-500 border-cyan-500`; break;
            case COLOR.SKY: focusClass = `focus:ring-sky-500 ${link || outline ? "text-sky-500" : "text-white"} bg-sky-500 border-sky-500`; break;
            case COLOR.INDIGO: focusClass = `focus:ring-indigo-500 ${link || outline ? "text-indigo-500" : "text-white"} bg-indigo-500 border-indigo-500`; break;
            case COLOR.VIOLET: focusClass = `focus:ring-violet-500 ${link || outline ? "text-violet-500" : "text-white"} bg-violet-500 border-violet-500`; break;
            case COLOR.PURPLE: focusClass = `focus:ring-purple-500 ${link || outline ? "text-purple-500" : "text-white"} bg-purple-500 border-purple-500`; break;
            case COLOR.FUCHSIA: focusClass = `focus:ring-fuchsia-500 ${link || outline ? "text-fuchsia-500" : "text-white"} bg-fuchsia-500 border-fuchsia-500`; break;
            case COLOR.PINK: focusClass = `focus:ring-pink-500 ${link || outline ? "text-pink-500" : "text-white"} bg-pink-500 border-pink-500`; break;
            case COLOR.ROSE: focusClass = `focus:ring-rose-500 ${link || outline ? "text-rose-500" : "text-white"} bg-rose-500 border-rose-500`; break;
            case COLOR_TYPE.PRIMARY: focusClass = `focus:ring-primary-500 ${link || outline ? "text-primary-500" : "text-primarytext-500"} bg-primary-500 border-primary-500`; break;
            case COLOR_TYPE.SECONDARY: focusClass = `focus:ring-secondary-500 ${link || outline ? "text-secondary-500" : "text-secondarytext-500"} bg-secondary-500 border-secondary-500`; break;
            case COLOR_TYPE.TERTIARY: focusClass = `focus:ring-tertiary-500 ${link || outline ? "text-tertiary-500" : "text-tertiarytext-500"} bg-tertiary-500 border-tertiary-500`; break;
            case COLOR_TYPE.DANGER: focusClass = `focus:ring-danger-500 ${link || outline ? "text-danger-500" : "text-dangertext-500"} bg-danger-500 border-danger-500`; break;
            case COLOR_TYPE.WARN: focusClass =`focus:ring-warn-500 ${link || outline ? "text-warn-500" : "text-warntext-500"} bg-warn-500 border-warn-500`; break;
            case COLOR_TYPE.SUCCESS: focusClass = `focus:ring-success-500 ${link || outline ? "text-success-500" : "text-successtext-500"} bg-success-500 border-success-500`; break;
            default: console.warn(`Unexpected color value: ${color}`); break;
        }
        return focusClass;
    }
    const getClassName = () => {
        let baseClasses = `${className} inline inline-flex items-center gap-2 justify-center py-1 px-3 
        rounded text-center focus:outline-none focus:ring-4 focus:ring-opacity-50 border 
        disabled:text-gray-400 disabled:bg-gray-100
        dark:disabled:text-gray-400 dark:disabled:border-gray-600 dark:disabled:bg-gray-600
        hover:border-opacity-0 ${getColorClasses()} transition-all 
        ease-in-out duration-500 delay-50 
        ${(outline || link) ? 'hover:bg-opacity-20 bg-opacity-0 disabled:bg-opacity-0 dark:disabled:bg-opacity-0 disabled:border-gray-300' : 'hover:bg-opacity-75 disabled:border-gray-100'}
        ${link && 'border-opacity-0 dark:disabled:border-opacity-0 disabled:border-opacity-0'}`;
        return baseClasses;
    };

    const Loading = () => {
        if (loading) {
            return (<>
                <svg
                    role="status"
                    className="inline mr-2 w-4 h-4 text-gray-300 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                    />
                </svg>
                {loadingText || 'Loading...'}
            </>);
        } else {
            //no loading
            return <>{children}</>;
        }
    };

    return (    <button type={type} className={noStyle ? className : getClassName()} disabled={loading || rest.disabled}
                        onClick={onClick} ref={ref} {...rest}>
            <Loading></Loading>
        </button>


    );
});

export default Button;
