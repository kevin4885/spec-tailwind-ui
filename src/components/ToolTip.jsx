import * as React from 'react';
import {
    autoUpdate,
    flip,
    FloatingPortal,
    offset,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useMergeRefs,
    useRole,
} from '@floating-ui/react';

//https://floating-ui.com/docs/react-examples
export function useTooltip({
                               initialOpen = false,
                               placement = 'top',
                               open: controlledOpen,
                               onOpenChange: setControlledOpen,
                           } = {}) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = setControlledOpen ?? setUncontrolledOpen;

    const data = useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(10),
            flip({
                crossAxis: placement.includes('-'),
                fallbackAxisSideDirection: 'start',
                padding: 5,
            }),
            shift({ padding: 5 }),
        ],
    });

    const context = data.context;

    const hover = useHover(context, {
        move: false,
        enabled: controlledOpen == null,
    });
    const focus = useFocus(context, {
        enabled: controlledOpen == null,
    });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'tooltip' });

    const interactions = useInteractions([hover, focus, dismiss, role]);

    return React.useMemo(
        () => ({
            open,
            setOpen,
            ...interactions,
            ...data,
        }),
        [open, setOpen, interactions, data],
    );
}

const TooltipContext = React.createContext(null);

export const useTooltipContext = () => {
    const context = React.useContext(TooltipContext);

    if (context == null) {
        throw new Error('Tooltip components must be wrapped in <Tooltip />');
    }

    return context;
};

export function ToolTip({ children, ...options }) {
    // This can accept any props as options, e.g. `placement`,
    // or other positioning options.
    const tooltip = useTooltip(options);
    return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
}

export const TooltipTrigger = React.forwardRef(function TooltipTrigger(
    { children, onClick, asChild = false, ...props },
    propRef,
) {
    const context = useTooltipContext();
    const childrenRef = children.ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(
            children,
            context.getReferenceProps({
                ref,
                ...props,
                ...children.props,
                'data-state': context.open ? 'open' : 'closed',
            }),
        );
    }

    return (
        <button
            ref={ref}
            type="button"
            // The user can style the trigger based on the state
            data-state={context.open ? 'open' : 'closed'}
            className="flex items-center"
            onClick={onClick}
            {...context.getReferenceProps(props)}
        >
            {children}
        </button>
    );
});

export const TooltipContent = React.forwardRef(function TooltipContent({ className, style, ...props }, propRef) {
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    if (!context.open) return null;

    return (
        <FloatingPortal>
            <div
                ref={ref}
                style={{
                    ...context.floatingStyles,
                    ...style,
                }}
                className={
                    className ||
                    'max-w-sm px-2 py-2 border rounded-lg z-50 shadow-lg backdrop-blur-sm dark:bg-opacity-50 dark:bg-gray-950 dark:border-primary-500 dark:border-opacity-50 bg-opacity-50 bg-gray-50 border-primary-500 border-opacity-50'
                }
                {...context.getFloatingProps(props)}
            />
        </FloatingPortal>
    );
});
