import { atomWithStore } from 'jotai-zustand';
import { createStore } from 'zustand/vanilla';
import { atom } from 'jotai';

const MODE_KEY = 'TAILWIND_UI_MODE';
const setDarkMode = (get, set, newDarkMode) => {
    set(darkModeAtom, newDarkMode);

    if (newDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage[MODE_KEY] = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage[MODE_KEY] = 'light';
    }
};

const getDarkMode = () => {
    if (localStorage[MODE_KEY] === 'dark' || (!(MODE_KEY in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        return true;
    } else {
        document.documentElement.classList.remove('dark');
        return false;
    }
};

export const darkModeAtom = atom(getDarkMode(), setDarkMode);


// alert
const initialAlert = {
    isOpen: false,
    message: '',
    title: '',
    buttonText: 'Ok',
    buttonColor: 'primary',
    icon: 'info',
    iconColor: 'primary',
};

export const alertModalStore = createStore(() => initialAlert);
export const alertModalAtom = atomWithStore(alertModalStore);
export const showAlert = (msg, title, icon = 'info', iconColor = 'primary', buttonColor = 'primary', buttonText = 'Ok') => {
    let message = typeof msg === 'string' ? msg : msg.message || 'The was an error processing your request.';
    alertModalStore.setState(() => ({ isOpen: true, message, title, icon, iconColor, buttonColor, buttonText }));
};
export const closeAlert = () => {
    alertModalStore.setState(() => initialAlert);
};

// error
export const showErrorMessage = message => showAlert(message, 'There was a problem', 'warning', 'warn');
export const closeErrorMessage = closeAlert;

//confirm

const initialConfirm = { isOpen: false, message: '', title: '', icon: 'help_outline', iconColor: 'danger' };

export const confirmModalStore = createStore(() => initialConfirm);
export const confirmModalAtom = atomWithStore(confirmModalStore);
export const showConfirm = params => {
    confirmModalStore.setState(() => ({ isOpen: true, ...params }));
};
export const closeConfirm = () => {
    confirmModalStore.setState(() => initialConfirm);
};

