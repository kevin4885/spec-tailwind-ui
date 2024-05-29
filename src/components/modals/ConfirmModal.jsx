import Button from '../controls/Button.jsx';
import BaseModal from './BaseModal.jsx';
import { useState } from 'react';


const ConfirmModal = ({
                          isOpen,
                          onClose,
                          children,
                          title,
                          affirmativeText = 'Yes',
                          negativeText = 'No',
                          affirmativeColor = 'primary',
                          negativeColor = 'warn',
                          loadingText = 'Loading...',
                          icon = 'info',
                          iconColor = 'primary',
                          affirmativeOutline,
                          negativeOutline = true,
                          containerClass = 'overflow-auto',
                          wClass = 'lg:max-w-lg',
                          hClass = 'lg:h-auto lg:max-h-[95%]',
                      }) => {
    const [isLoading, setIsLoading] = useState(false);

    const buttons = [
        <Button key="no" disabled={isLoading} outline={negativeOutline} color={negativeColor}
                onClick={() => onClose(false)}>
            {negativeText}
        </Button>,
        <Button key="yes" color={affirmativeColor} outline={affirmativeOutline} loading={isLoading}
                loadingText={loadingText} onClick={() => onClose({ setIsLoading })}>
            {affirmativeText}
        </Button>,
    ];
    return (
        <BaseModal isOpen={isOpen} icon={icon} iconColor={iconColor} title={title} buttons={buttons}
                   onCloseRequest={onClose} wClass={wClass} hClass={hClass} containerClass={containerClass}>
            {children}
        </BaseModal>
    );
};

export default ConfirmModal;
