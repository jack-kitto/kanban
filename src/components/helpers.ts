import type { DropResult } from "react-beautiful-dnd";
import type { ColumnType, DndItem, TaskType } from "./types";
import { generateKeyBetween } from "fractional-indexing";

/**
* @throws {Error} if no destination
* @throws {Error} if no dragged item
* @throws {Error} if no above and no below item found
**/
export function handleDragEnd<T extends DndItem>(result: DropResult, arr: T[], setArr: (arr: T[]) => void): void {
  if (!result.destination) {
    throw new Error("No destination");
  }
  const draggedItem = arr.find((item: T) => item.id === result.draggableId);
  if (!draggedItem) {
    throw new Error("No dragged item");
  }
  const sourceIndex = result.source.index;
  const destinationIndex = result.destination.index;
  if (sourceIndex === destinationIndex) {
    // No change in position, skip
    return
  }
  const newArr = Array.from(arr);
  newArr.splice(sourceIndex, 1); // Remove the dragged item from its original position
  newArr.splice(destinationIndex, 0, draggedItem); // Insert the dragged item into the new position
  const aboveItem = destinationIndex > 0 ? newArr[destinationIndex - 1] : null;
  const belowItem = destinationIndex < newArr.length - 1 ? newArr[destinationIndex + 1] : null;
  if (!aboveItem && !belowItem) {
    throw new Error("No above and no below item found");
  }
  let a = aboveItem?.position ?? null;
  let b = belowItem?.position ?? null;
  if (a !== null && b !== null && a >= b) {
    const temp = b;
    b = a;
    a = temp;
  }
  const newPosition = generateKeyBetween(a, b);
  const updatedArr = arr.map((item: T) => item.id === draggedItem.id ? { ...item, position: newPosition } : item);
  setArr(updatedArr);
}

/**
* @throws {Error} if no above and no below item found
* @throws {Error} if invalid position - where above item position is greater than or equal to below item position
 **/
export function handleInsertItem<T extends DndItem>(arr: T[], item: T, index: number): T[] {
  const aboveItem = index > 0 ? arr[index - 1] : null;
  const belowItem = index < arr.length - 1 ? arr[index] : null;
  const a = aboveItem?.position ?? null;
  const b = belowItem?.position ?? null;
  if (a !== null && b !== null && a >= b) {
    throw new Error("Invalid position");
  }
  const newPosition = generateKeyBetween(a, b);
  item.position = newPosition;
  return [...arr, item];
}

export function sortItems<T extends DndItem>(arr: T[]): T[] {
  return arr.sort((a: T, b: T): number => a.position > b.position ? 1 : -1);
}

export function updateTaskInListOfColumns(task: TaskType, columns: ColumnType[], setColumns: (columns: ColumnType[]) => void): void {
  setColumns(
    columns.map((c: ColumnType): ColumnType => {
      // if the task is not in the column, but its id is in the column, it has been added to the column and should be pushed to the end
      if (c.id === task.columnId && !c.tasks.find((t: TaskType): boolean => t.id === task.id)) {
        return {
          ...c,
          tasks: c.tasks.concat(task)
        }
      }

      // if the task is in the column, but its id is in the column, update the task in the column, as it has not changed columns
      if (c.id === task.columnId && c.tasks.find((t: TaskType): boolean => t.id === task.id)) {
        return {
          ...c,
          tasks: c.tasks.map((t: TaskType): TaskType => t.id === task.id ? task : t)
        }
      }

      // if the task is in the column, but its id is not in the column, it has been removed from the column and should be removed
      if (c.id !== task.columnId && c.tasks.find((t: TaskType): boolean => t.id === task.id)) {
        return {
          ...c,
          tasks: c.tasks.filter((t: TaskType): boolean => t.id !== task.id)
        }
      }
      return c
    })
  )
}
