import React, { useMemo, useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { SortableOverlay } from "./SortableOverlay";
import { DragHandle, SortableItem } from "./SortableItem";

//https://codesandbox.io/s/dnd-kit-sortable-starter-template-22x1ix?file=/src/components/SortableList/SortableList.tsx:0-2057

export function SortableList({ items, onChange, renderItem, className }) {
  const [active, setActive] = useState(null);
  const activeItem = useMemo(() => items.find(item => item.id === active?.id), [active, items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(active, overIndex, arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}>
      <SortableContext items={items}>
        <ul className={className} role="application">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>{renderItem(item, active, index)}</React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>{activeItem ? renderItem(activeItem) : null}</SortableOverlay>
    </DndContext>
  );
}
export default SortableList;
SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
