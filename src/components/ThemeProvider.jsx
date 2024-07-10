import AlertModal from './modals/AlertModal.jsx';
import ConfirmModal from './modals/ConfirmModal.jsx';
import { useAtom } from 'jotai';
import { alertModalAtom, closeAlert, confirmModalAtom } from '../stores/themeStore.js';
import { createContext, useEffect, useState } from 'react';
import { setPageTheme } from '../theme/theme.js';

const MODE_KEY = 'SPEC_TAILWIND_UI_MODE';

const getLocalDarkMode = () => {
    if (typeof (localStorage) !== 'undefined') {
        if (localStorage[MODE_KEY] === 'dark' || (!(MODE_KEY in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            return true;
        } else {
            document.documentElement.classList.remove('dark');
            return false;
        }
    } else {
        return false;
    }
};

const setLocalDarkMode = (value) => {
    if (typeof (localStorage) !== 'undefined') {
        if (value) {
            document.documentElement.classList.add('dark');
            localStorage[MODE_KEY] = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage[MODE_KEY] = 'light';
        }
    }
};

export const ThemeContext = createContext(null);

const ThemeProvider = ({ lightTheme, darkTheme, darkColors, lightColors, children }) => {
    const [alert] = useAtom(alertModalAtom);
    const [confirm] = useAtom(confirmModalAtom);

    const [isDarkMode, setDarkMode] = useState(getLocalDarkMode());

    function toggleDarkMode() {
        const newMode = !getLocalDarkMode();
        setDarkMode(newMode);
        setLocalDarkMode(newMode);
    }


    useEffect(() => {
        console.log('Dark mode: ' + isDarkMode);
        setPageTheme(isDarkMode ? darkTheme : lightTheme, isDarkMode ? darkColors : lightColors);
    }, [lightTheme, darkTheme, isDarkMode, darkColors, lightColors]);
    return (
        <ThemeContext.Provider value={{toggleDarkMode, lightTheme, darkTheme, lightColors, darkColors}}>
            {children}
            {alert.isOpen && (
                <AlertModal isOpen={alert.isOpen} icon={alert.icon} iconColor={alert.iconColor} title={alert.title}
                            buttonColor={alert.buttonColor} buttonText={alert.buttonText} onClose={closeAlert}>
                    {alert.message}
                </AlertModal>
            )}

            {confirm.isOpen && <ConfirmModal {...confirm}>{confirm.message}</ConfirmModal>}
        </ThemeContext.Provider>
    );
};
export default ThemeProvider;
