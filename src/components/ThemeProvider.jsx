import AlertModal from './modals/AlertModal.jsx';
import ConfirmModal from './modals/ConfirmModal.jsx';
import { useAtom } from 'jotai';
import { alertModalAtom, closeAlert, confirmModalAtom } from '../stores/themeStore.js';


const ThemeProvider = () => {
    const [alert] = useAtom(alertModalAtom);
    const [confirm] = useAtom(confirmModalAtom);

    return (
        <>
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
