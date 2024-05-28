import {createContext, useContext, useMemo} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

const SortableItemContext = createContext({
    attributes: {},
    listeners: undefined,
    ref() {
    },
});

export function SortableItem({children, id, className}) {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({id});
    const context = useMemo(
        () => ({
            attributes,
            listeners,
            ref: setActivatorNodeRef,
        }),
        [attributes, listeners, setActivatorNodeRef]
    );
    const style = {
        opacity: isDragging ? 0.4 : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <SortableItemContext.Provider value={context}>
            <li className={`list-none m-0 p-0 indent-0 ${className}`} ref={setNodeRef} style={style}>
                {children}
            </li>
        </SortableItemContext.Provider>
    );
}

export default SortableItem;

export function DragHandle({children, className}) {
    const {attributes, listeners, ref} = useContext(SortableItemContext);
    return (
        <button type="button" className={className} {...attributes} {...listeners} ref={ref}>
            {children}
            {!children && (
                <svg viewBox="0 0 20 20" width="12">
                    <path
                        d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                </svg>
            )}
        </button>
    );
}
