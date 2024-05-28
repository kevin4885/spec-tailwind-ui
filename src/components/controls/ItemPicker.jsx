import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  size,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import BaseInput from "./BaseInput.jsx";
import Spinner from "../Spinner.jsx";

const Item = forwardRef(({ children, active, ...rest }, ref) => {
  const id = useId();
  return (
    <div
      ref={ref}
      role="option"
      id={id}
      aria-selected={active}
      {...rest}
      className={`${
        active && "bg-primary-500 text-white dark:bg-opacity-40 bg-opacity-70 "
      } select-none m-1 px-2 rounded-md py-1 hover:text-white hover:bg-primary-500 dark:hover:bg-opacity-40 hover:bg-opacity-70  transition-all ease-in-out duration-150 hover:cursor-pointer`}
    >
      {children}
    </div>
  );
});

export default function ItemPicker({
  pickerItems,
  value,
  onQueryChange,
  onChange,
  labelKey = "name",
  idKey = "id",
  placeholder,
  label,
  description,
  isLoading,
  messages,
  required,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [items, setItems] = useState([]);

  const listRef = useRef([]);

  useEffect(() => {
    setItems(pickerItems);
    const v = pickerItems?.find((i) => i[idKey] === value);
    if (v) setQuery(v[labelKey]);
  }, [pickerItems, value, setItems, setQuery, idKey, labelKey]);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      flip({ padding: 10 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [role, dismiss, listNav],
  );

  function handleQueryChange(e) {
    const value = e.target.value;
    setQuery(value);
    onChange(null);
    if (onQueryChange) onQueryChange(value);
    else if (pickerItems)
      setItems(
        pickerItems.filter((i) =>
          i.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()),
        ),
      );

    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      // setOpen(false);
    }
  }

  //const items = data.filter(item => item.toLowerCase().startsWith(inputValue.toLowerCase()));

  return (
    <React.Fragment>
      <BaseInput
        type="text"
        label={label}
        description={description}
        messages={messages}
        required={required}
      >
        <input
          {...getReferenceProps({
            ref: refs.setReference,
            onChange: handleQueryChange,
            onClick: () => {
              setOpen(true);
              refs.domReference.current?.select();
            },
            value: query,
            placeholder,
            "aria-autocomplete": "list",
            onKeyDown(event) {
              if (
                event.key === "Enter" &&
                activeIndex != null &&
                items[activeIndex]
              ) {
                onChange(items[activeIndex][idKey]);
                setQuery(items[activeIndex][labelKey]);
                setActiveIndex(null);
                setOpen(false);
              }
            },
          })}
          //   onChange={handleQueryChange}
          //   value={query}
        />
      </BaseInput>
      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            visuallyHiddenDismiss
          >
            <div
              className="overflow-y-auto z-50 rounded-lg bg-opacity-90 shadow-lg bg-white border-opacity-20 backdrop-blur-sm border-gray-500 dark:bg-opacity-75 dark:bg-gray-950 dark:border-gray-300 dark:border-opacity-20 border dark:backdrop-blur-sm"
              {...getFloatingProps({
                ref: refs.setFloating,
                style: {
                  ...floatingStyles,
                },
              })}
            >
              {isLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="flex items-center">
                    <div className="flex mt-1 h-4 w-4">
                      <Spinner />
                    </div>
                    <div className="flex pl-2">Searching...</div>
                  </div>
                </div>
              )}
              {!isLoading && !items && (
                <div className="flex justify-center items-center py-8">
                  <div className="flex items-center">
                    <div className="flex">
                      We could not find anything in your search.
                    </div>
                  </div>
                </div>
              )}
              {!isLoading &&
                items &&
                items.map((item, index) => (
                  <Item
                    {...getItemProps({
                      key: item[idKey],
                      ref(node) {
                        listRef.current[index] = node;
                      },
                      onClick() {
                        onChange(item[idKey]);
                        setQuery(item[labelKey]);
                        setOpen(false);
                        refs.domReference.current?.focus();
                      },
                    })}
                    active={activeIndex === index}
                  >
                    {item[labelKey]}
                  </Item>
                ))}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </React.Fragment>
  );
}
