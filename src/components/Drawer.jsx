import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Drawer = ({isOpen, onCloseRequest, widthFull=false, children}) => {
    const [swipeStart, setSwipeStart] = useState(-1);
    const [swipeEnd, setSwipeEnd] = useState(-1);
    const isLg = useMediaQuery({
        query: '(min-width: 1024px)',
    });

    function handleSwipeStart(e) {
        setSwipeStart(e.targetTouches[0].pageX);
        setSwipeEnd(-1);
    }

    function handleSwipeMove(e) {
        setSwipeEnd(e.targetTouches[0].pageX);
    }

    function handleSwipeEnd() {
        if (swipeEnd > 0 && swipeStart - swipeEnd > 75) onCloseRequest();
        setSwipeStart(-1);
        setSwipeEnd(-1);
    }

    function handleClick() {
        if (isLg) onCloseRequest()
    }

    useEffect(() => {
        const closeOnEscapeKey = e => (e.key === 'Escape' ? isOpen && onCloseRequest && onCloseRequest() : null);
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [isOpen, onCloseRequest]);

    return createPortal(
        <>
            <div className={`absolute top-0 h-full flex-col flex-no-shrink z-30  overflow-hidden bg-white dark:bg-gray-900 transition-all ease-out duration-200  ${isOpen ? " left-0" : " -left-96 w-2"}  ${widthFull && isOpen ? " w-full" : "min-w-72"}`}>{children}</div>
            {isOpen && <div className="fixed inset-0 backdrop-blur-sm " onClick={handleClick} onTouchStart={handleSwipeStart} onTouchEnd={handleSwipeEnd} onTouchMove={handleSwipeMove}></div>}
        </>,
        document.body
    );
};

export default Drawer;