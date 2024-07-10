import AlertModal from './modals/AlertModal.jsx';
import ConfirmModal from './modals/ConfirmModal.jsx';
import { useAtom, useAtomValue } from 'jotai';
import { alertModalAtom, closeAlert, confirmModalAtom, darkModeAtom } from '../stores/themeStore.js';
import { useEffect } from 'react';
import { setPageTheme } from '../theme/theme.js';


const ThemeProvider = ({ lightTheme, darkTheme, darkColors, lightColors, children }) => {
    const [alert] = useAtom(alertModalAtom);
    const [confirm] = useAtom(confirmModalAtom);
    const darkMode = useAtomValue(darkModeAtom);

    useEffect(() => {
        console.log('Dark mode: ' + darkMode);
        setPageTheme(darkMode ? darkTheme : lightTheme, darkMode ? darkColors : lightColors);
    }, [lightTheme, darkTheme, darkMode, darkColors, lightColors]);
    return (
        <>
            {children}
            {alert.isOpen && (
                <AlertModal isOpen={alert.isOpen} icon={alert.icon} iconColor={alert.iconColor} title={alert.title}
                            buttonColor={alert.buttonColor} buttonText={alert.buttonText} onClose={closeAlert}>
                    {alert.message}
                </AlertModal>
            )}

            {confirm.isOpen && <ConfirmModal {...confirm}>{confirm.message}</ConfirmModal>}
        </>
    );
};
export default ThemeProvider;
