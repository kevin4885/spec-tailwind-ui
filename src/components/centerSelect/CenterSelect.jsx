import { useFloating, flip, size, autoUpdate, useInteractions, inner, useInnerOffset, useClick, useListNavigation, useDismiss, useRole, useTypeahead, FloatingFocusManager, FloatingOverlay, FloatingPortal, offset, shift } from "@floating-ui/react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ScrollArrow } from "./ScrollArrow";
import BaseInput from '../controls/BaseInput.jsx';

const CenterSelect = ({ onChange, value, items, renderItem = i => <div>{i}</div>, label, description }) => {
  const listRef = useRef([]);
  const listContentRef = useRef([]);
  const overflowRef = useRef(null);
  const allowSelectRef = useRef(false);
  const allowMouseUpRef = useRef(true);
  const selectTimeoutRef = useRef();
  const scrollRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(12);
  const [activeIndex, setActiveIndex] = useState(null);
  const [fallback, setFallback] = useState(false);
  const [innerOffset, setInnerOffset] = useState(0);
  const [touch, setTouch] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [blockSelection, setBlockSelection] = useState(false);

  if (!open) {
    if (innerOffset !== 0) setInnerOffset(0);
    if (fallback) setFallback(false);
    if (blockSelection) setBlockSelection(false);
  }

  useEffect(() => {
    let i = items.findIndex(i => i.id === value);
    if (i < 0) i = 0;
    setSelectedIndex(i);
  }, [value, items, setSelectedIndex]);

  const setSelected = i => {
    if (items && onChange) onChange(items[i].id);
    setSelectedIndex(i);
  };

  const { refs, floatingStyles, context, isPositioned } = useFloating({
    placement: "bottom-center",
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    transform: false,
    middleware: fallback
      ? [
          offset(5),
          touch ? shift({ crossAxis: true, padding: 10 }) : flip({ padding: 10 }),
          size({
            apply({ availableHeight }) {
              Object.assign(scrollRef.current?.style ?? {}, {
                maxHeight: `${availableHeight}px`,
              });
            },
            padding: 10,
          }),
        ]
      : [
          inner({
            listRef,
            overflowRef,
            scrollRef,
            index: selectedIndex,
            offset: innerOffset,
            onFallbackChange: setFallback,
            padding: 10,
            minItemsVisible: touch ? 8 : 4,
            referenceOverflowThreshold: 20,
          }),
          offset({ crossAxis: -4 }),
        ],
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context, { event: "mousedown" }),
    useDismiss(context),
    useRole(context, { role: "listbox" }),
    useInnerOffset(context, {
      enabled: !fallback,
      onChange: setInnerOffset,
      overflowRef,
      scrollRef,
    }),
    useListNavigation(context, {
      listRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
    }),
    useTypeahead(context, {
      listRef: listContentRef,
      activeIndex,
      onMatch: open ? setActiveIndex : setSelected,
    }),
  ]);

  useEffect(() => {
    if (open) {
      selectTimeoutRef.current = setTimeout(() => {
        allowSelectRef.current = true;
      }, 300);

      return () => {
        clearTimeout(selectTimeoutRef.current);
      };
    } else {
      allowSelectRef.current = false;
      allowMouseUpRef.current = true;
    }
  }, [open]);

  const handleArrowScroll = amount => {
    if (fallback) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop -= amount;
        flushSync(() => setScrollTop(scrollRef.current?.scrollTop ?? 0));
      }
    } else {
      flushSync(() => setInnerOffset(value => value - amount));
    }
  };

  const handleArrowHide = () => {
    if (touch) {
      clearTimeout(selectTimeoutRef.current);
      setBlockSelection(true);
      selectTimeoutRef.current = setTimeout(() => {
        setBlockSelection(false);
      }, 400);
    }
  };

  const item = items[selectedIndex];

  return (
    <>
      <BaseInput label={label} description={description}>
        <button
          type="button"
          ref={refs.setReference}
          {...getReferenceProps({
            onTouchStart() {
              setTouch(true);
            },
            onPointerMove({ pointerType }) {
              if (pointerType !== "touch") {
                setTouch(false);
              }
            },
          })}>
          <span className="mx-3 flex">{renderItem(item)}</span>
        </button>
      </BaseInput>
      {open && (
        <FloatingPortal>
          <FloatingOverlay lockScroll={!touch} style={{ zIndex: 100 }}>
            <FloatingFocusManager context={context} modal={false}>
              <div ref={refs.setFloating} style={{ ...floatingStyles, outline: "0" }}>
                <div
                  className="CenterSelect flex flex-col"
                  ref={scrollRef}
                  {...getFloatingProps({
                    onScroll({ currentTarget }) {
                      flushSync(() => setScrollTop(currentTarget.scrollTop));
                    },
                    onContextMenu(e) {
                      e.preventDefault();
                    },
                  })}>
                  {items &&
                    items.map((item, i) => {
                      return (
                        <button
                          key={item.id}
                          // Prevent immediate selection on touch devices when
                          // pressing the ScrollArrows
                          disabled={blockSelection}
                          aria-selected={selectedIndex === i}
                          type="button"
                          role="option"
                          tabIndex={activeIndex === i ? 0 : -1}
                          className={`${activeIndex === i ? "bg-primary-500 dark:bg-primary-500 bg-opacity-50 dark:bg-opacity-50" : i === selectedIndex ? "bg-primary-500 dark:bg-primary-500  dark:bg-opacity-25 bg-opacity-25" : "bg-transparent"} ${i === selectedIndex ? "font-semibold" : "font-normal"}`}
                          ref={node => {
                            listRef.current[i] = node;
                            listContentRef.current[i] = item;
                          }}
                          {...getItemProps({
                            onTouchStart() {
                              allowSelectRef.current = true;
                              allowMouseUpRef.current = false;
                            },
                            onKeyDown() {
                              allowSelectRef.current = true;
                            },
                            onClick() {
                              if (allowSelectRef.current) {
                                setSelected(i);
                                setOpen(false);
                              }
                            },
                            onMouseUp() {
                              if (!allowMouseUpRef.current) {
                                return;
                              }

                              if (allowSelectRef.current) {
                                setSelected(i);
                                setOpen(false);
                              }

                              // On touch devices, prevent the element from
                              // immediately closing `onClick` by deferring it
                              clearTimeout(selectTimeoutRef.current);
                              selectTimeoutRef.current = setTimeout(() => {
                                allowSelectRef.current = true;
                              });
                            },
                          })}>
                          <span>{renderItem(item)}</span>
                        </button>
                      );
                    })}
                </div>
                {["up", "down"].map(dir => (
                  <ScrollArrow key={dir} dir={dir} scrollTop={scrollTop} scrollRef={scrollRef} innerOffset={innerOffset} isPositioned={isPositioned} onScroll={handleArrowScroll} onHide={handleArrowHide} />
                ))}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  );
}

export default CenterSelect;