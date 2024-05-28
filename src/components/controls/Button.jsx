import { forwardRef } from 'react';


const Button = forwardRef(function (
    {
        className,
        children,
        noStyle = false,
        link,
        type = 'button',
        color = 'blue-500',
        textColor,
        outline,
        loading,
        loadingText,
        onClick,
        ...rest
    },
    ref,
) {

    if (!textColor) textColor = outline || link ? 'blue-500' : 'white';

    let newClass = `${className} inline inline-flex h-full items-center gap-2 justify-center py-1 px-3 rounded text-center focus:outline-none focus:ring-4 focus:ring-${color} focus:ring-opacity-50 border ${
        link && 'border-opacity-0'
    }`;
    if (outline || link || loading) {
        if (rest.disabled || loading) {
            newClass = `${newClass} text-gray-400 border-gray-400 border`;
        } else {
            newClass = `${newClass} text-${textColor} border border-${color} hover:bg-opacity-20 hover:bg-${color}  transition-all ease-in-out duration-500 delay-50`;
        }
    } else {
        if (rest.disabled || loading) {
            newClass = `${newClass} text-gray-400 border-gray-100 border bg-gray-100`;
        } else {
            newClass = `${newClass} hover:bg-opacity-75 hover:border-opacity-0 bg-${color} text-${textColor} border-${color} transition-all ease-in-out duration-500 delay-50`;
        }
    }

    const Loading = () => {
        if (loading) {
            return (
                <>
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
                </>
            );
        } else {
            //no loading
            return <>{children}</>;
        }
    };

    return (
        <button type={type} className={noStyle ? className: newClass} disabled={loading || rest.disabled} onClick={onClick} ref={ref} {...rest}>
            <Loading></Loading>
        </button>
    );
});

export default Button;
