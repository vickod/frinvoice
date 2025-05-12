type totalProps = {
  price: number;
  quantity: number;
  tva?: number;
  total?: number;
};
export function getItemTotal(obj: totalProps, isTvaIncluded: boolean) {
  if (obj.price && obj.quantity && !isNaN(obj.price) && !isNaN(obj.quantity)) {
    const total =
      obj.tva && isTvaIncluded
        ? (obj.price * obj.quantity * obj.tva) / 100 + obj.price * obj.quantity
        : obj.price * obj.quantity;
    return total <= 200_000_000_000 && total > -1 ? total : 0;
  }
  return 0;
}
export function getTotalTva(arr: totalProps[], isTvaIncluded: boolean) {
  const totalTva = arr.reduce((prev, curr) => {
    return (prev +=
      curr.tva && isTvaIncluded
        ? (curr.price * curr.quantity * curr.tva) / 100
        : 0);
  }, 0);
  return totalTva <= 300_000_000_000 && totalTva > -1 ? totalTva : 0;
}
export function getTotalHtva(arr: totalProps[]) {
  const totalHtva = arr.reduce((prev, curr) => {
    return (prev += curr.price * curr.quantity || 0);
  }, 0);
  return totalHtva <= 300_000_000_000 && totalHtva > -1 ? totalHtva : 0;
}
export function getTotal(arr: totalProps[]) {
  const total = arr.reduce((prev, curr) => {
    return (prev += curr?.total || 0);
  }, 0);

  return total <= 600_000_000_000 ? total : 0;
}
