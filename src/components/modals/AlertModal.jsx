import BaseModal from './BaseModal.jsx';
import Button from '../controls/Button.jsx';

const AlertModal = ({
                        isOpen,
                        onClose,
                        children,
                        title,
                        buttonText = 'Ok',
                        buttonColor = 'primary',
                        icon = 'info',
                        iconColor = 'primary',
                    }) => {
    const buttons = [
        <Button key={buttonText} color={buttonColor} onClick={onClose}>
            {buttonText}
        </Button>,
    ];

    return (
        <BaseModal isOpen={isOpen} zIndex="z-50" icon={icon} iconColor={iconColor} title={title} buttons={buttons}
                   onCloseRequest={onClose} wClass="lg:max-w-lg">
            <div className="flex px-4 py-4 w-full ">{children}</div>
        </BaseModal>
    );
};

export default AlertModal;
