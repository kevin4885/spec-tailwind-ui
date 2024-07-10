import AlertModal from './modals/AlertModal.jsx';
import ConfirmModal from './modals/ConfirmModal.jsx';
import { useAtom } from 'jotai';
import { alertModalAtom, closeAlert, confirmModalAtom } from '../stores/themeStore.js';
import { useEffect } from 'react';
import { setPageTheme } from '../theme/theme.js';


const ThemeProvider = ({ theme, colors, children }) => {
    const [alert] = useAtom(alertModalAtom);
    const [confirm] = useAtom(confirmModalAtom);

    useEffect(() => {
        setPageTheme(theme, colors);
    }, [theme, colors]);
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
