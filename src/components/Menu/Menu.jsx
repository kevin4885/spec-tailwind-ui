import { autoUpdate, flip, FloatingFocusManager, FloatingList, FloatingNode, FloatingPortal, FloatingTree, offset, safePolygon, shift, useClick, useDismiss, useFloating, useFloatingNodeId, useFloatingParentNodeId, useFloatingTree, useHover, useInteractions, useListItem, useListNavigation, useMergeRefs, useRole, useTypeahead } from "@floating-ui/react";
import * as React from "react";
import Icon from "../Icon/Icon.jsx";
import Button from '../controls/Button.jsx';

const MenuContext = React.createContext({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: () => {},
  setHasFocusInside: () => {},
  isOpen: false,
});
const className = "flex w-full outline-none rounded  items-center justify-start py-2 px-4 focus:text-primary-500 hover:text-primary-500 disabled:text-gray-400  dark:disabled:text-gray-500  disabled:hover:cursor-default  transition-all ease-in-out duration-300 hover:cursor-pointer";

export const MenuComponent = React.forwardRef(({ children, renderItem, label, ...props }, forwardedRef) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hasFocusInside, setHasFocusInside] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);

  const elementsRef = React.useRef([]);
  const labelsRef = React.useRef([]);
  const parent = React.useContext(MenuContext);

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const isNested = parentId != null;

  const { floatingStyles, refs, context } = useFloating({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: isNested ? "right-start" : "bottom-start",
    middleware: [
      offset({
        mainAxis: isNested ? 0 : 4,
        alignmentAxis: isNested ? -4 : 0,
      }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: isNested,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const click = useClick(context, {
    event: "mousedown",
    toggle: !isNested,
    ignoreMouse: isNested,
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: isOpen ? setActiveIndex : undefined,
    activeIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([hover, click, role, dismiss, listNavigation, typeahead]);

  // Event emitter allows you to communicate across tree components.
  // This effect closes all menus when an item gets clicked anywhere
  // in the tree.
  React.useEffect(() => {
    if (!tree) return;

    function handleTreeClick() {
      setIsOpen(false);
    }

    function onSubMenuOpen(event) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on("click", handleTreeClick);
    tree.events.on("menuopen", onSubMenuOpen);

    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("menuopen", onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  React.useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit("menuopen", { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);


    return (
        <FloatingNode id={nodeId}>
            <Button
                type="button"
                noStyle={isNested}
                ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
                tabIndex={!isNested ? undefined : parent.activeIndex === item.index ? 0 : -1}
                role={isNested ? 'menuitem' : undefined}
                data-open={isOpen ? '' : undefined}
                data-nested={isNested ? '' : undefined}
                data-focus-inside={hasFocusInside ? '' : undefined}
                className={isNested ? className : ''}
                {...(isNested ? {} : props)}
                {...getReferenceProps(
                    parent.getItemProps({
                        ...props,
                        onFocus(event) {
                            props.onFocus?.(event);
                            setHasFocusInside(false);
                            parent.setHasFocusInside(true);
                        },
                    }),
                )}>
                <div className="flex  items-center w-full">
                    {renderItem || label}
                    {isNested && !renderItem && (
                        <div aria-hidden className="flex grow justify-end pl-3 items-center">
                            <Icon icon="arrow_right" size={20} />
                        </div>
                    )}
                </div>
            </Button>
            <MenuContext.Provider
                value={{
                    activeIndex,
                    setActiveIndex,
                    getItemProps,
                    setHasFocusInside,
                    isOpen,
                }}>
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                    {isOpen && (
                        <FloatingPortal>
                            <FloatingFocusManager context={context} modal={false} initialFocus={isNested ? -1 : 0}
                                                  returnFocus={!isNested}>
                                <div ref={refs.setFloating}
                                     className="z-10 py-4 outline-none border-gray-500/10 dark:border-gray-500/20 border backdrop-blur bg-white/80 dark:bg-gray-950/70 dark:shadow-none shadow-2xl rounded-lg text-gray-500 dark:text-gray-400"
                                     style={floatingStyles} {...getFloatingProps()}>
                                    {children}
                                </div>
                            </FloatingFocusManager>
                        </FloatingPortal>
                    )}
                </FloatingList>
            </MenuContext.Provider>
        </FloatingNode>
    );
});

export const MenuItem = React.forwardRef(({ label, icon, iconColor ="primary", disabled, ...props }, forwardedRef) => {
  const menu = React.useContext(MenuContext);
  const item = useListItem({ label: disabled ? null : label });
  const tree = useFloatingTree();
  const isActive = item.index === menu.activeIndex;

  return (
    <button
      {...props}
      ref={useMergeRefs([item.ref, forwardedRef])}
      type="button"
      role="menuitem"
      className={className}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      {...menu.getItemProps({
        onClick(event) {
          props.onClick?.(event);
          tree?.events.emit("click");
        },
        onFocus(event) {
          props.onFocus?.(event);
          menu.setHasFocusInside(true);
        },
      })}>
      {icon && (
        <div className={`text-${iconColor}-500 flex-none mr-4`}>
          <Icon icon={icon} size={20} />
        </div>
      )}
      {label}
    </button>
  );
});

export const Menu = React.forwardRef((props, ref) => {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <MenuComponent {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <MenuComponent {...props} ref={ref} />;
});
