import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListItem,
  useRole,
} from "@floating-ui/react";
import * as React from "react";

const MenuListContext = React.createContext({});

function MenuList({ renderItem, children, className }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [flip()],
  });

  const elementsRef = React.useRef([]);
  const labelsRef = React.useRef([]);

  const handleSelect = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role],
  );

  const selectContext = React.useMemo(
    () => ({
      getItemProps,
      handleSelect,
    }),
    [getItemProps, handleSelect],
  );

  return (
    <>
      <div
        className={className}
        ref={refs.setReference}
        tabIndex={0}
        {...getReferenceProps()}
      >
        {renderItem}
      </div>
      <MenuListContext.Provider value={selectContext}>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              className="z-50 py-2 select-none flex flex-col items-center justify-start outline-none border-gray-500/10 dark:border-gray-500/20 border backdrop-blur bg-white/80 dark:bg-gray-950/70 dark:shadow-none shadow-2xl rounded-lg text-gray-500 dark:text-gray-400"
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {children}
              </FloatingList>
            </div>
          </FloatingFocusManager>
        )}
      </MenuListContext.Provider>
    </>
  );
}

export function MenuListItem({ children, className }) {
  const { getItemProps, handleSelect } = React.useContext(MenuListContext);
  const { ref, index } = useListItem({ children });

  return (
    <button
      ref={ref}
      type="button"
      className={
        className ||
        "flex px-4 py-2 w-full hover:text-primary-500 items-center justify-start"
      }
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      {children}
    </button>
  );
}

export default MenuList;
