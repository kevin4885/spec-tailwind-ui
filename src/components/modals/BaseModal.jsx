import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon.jsx';

const HeadingIcon = ({ icon, size = 40, color = 'primary' }) => {
    return <Icon
        className={`rounded p-2 text-white dark:text-gray-400 bg-${color}-500 dark:bg-gray-500 dark:bg-opacity-20`}
        icon={icon} size={size}></Icon>;
};

const BaseModal = ({
                       children,
                       isOpen = true,
                       onCloseRequest,
                       title,
                       icon,
                       iconColor = 'primary',
                       buttons,
                       zIndex = 'z-20',
                       containerClass = 'overflow-auto h-full',
                       wClass = 'lg:max-w-3xl',
                       hClass = 'lg:h-auto lg:max-h-[95%]',
                   }) => {
    useEffect(() => {
        const closeOnEscapeKey = e => (e.key === 'Escape' ? isOpen && onCloseRequest && onCloseRequest() : null);
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [isOpen, onCloseRequest]);

    if (!isOpen) return null;
    return createPortal(
        <div
            className={`fixed inset-0 lg:p-8 backdrop-blur-sm  bg-opacity-50 bg-gray-500 flex flex-col items-center justify-center  ${zIndex} ${isOpen ? 'opacity-100 pointer-events-auto ' : ' opacity-0 pointer-events-none'}`}>
            <div
                className={`${wClass} ${hClass} flex flex-col h-full w-full  dark:shadow-none bg-white dark:bg-gray-800  shadow-gray-950 dark:lg:shadow-none lg:shadow-2xl lg:rounded-lg text-gray-800 dark:text-gray-400 lg:p-5 overflow-hidden`}>
                <div className="flex flex-col h-full overflow-hidden">
                    <>
                        {title && (
                            <div
                                className="text-lg font-semibold border-b border-gray-500 border-opacity-20 pb-4 mb-2 flex items-center pl-2 gap-4 pt-2 lg:pt-0">
                                {icon && <HeadingIcon color={iconColor} icon={icon} size={35} />}
                                {title}
                            </div>
                        )}
                        <div className={containerClass}>{children}</div>
                        <div
                            className="flex items-center justify-center lg:justify-end my-4 mx-4 gap-4">{buttons && buttons}</div>
                    </>
                </div>
            </div>
        </div>,
        document.body,
    );
};
export default BaseModal;
