export function setNewItemInArrAtIndex(
  setterFunc: Function,
  newItem: any,
  index: number
): void {
  setterFunc((prevItems: any[]) => {
    const updatedItems = [...prevItems];
    updatedItems[index] = newItem;
    return updatedItems;
  });
}
