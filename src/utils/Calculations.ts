
type totalProps = {
    price: number;
    quantity: number;
    tva?: number;
    total?: number;
  };
 export function getItemTotal(obj: totalProps, isTvaIncluded: boolean) {
    if (obj.price && obj.quantity) {
      return obj.tva && isTvaIncluded
        ? (obj.price * obj.quantity * obj.tva) / 100 + obj.price * obj.quantity
        : obj.price * obj.quantity;
    }
    return 0;
  }
 export function getTotalTva(arr: [totalProps], isTvaIncluded: boolean) {
    let totalTva = 0;
    arr.forEach((item: totalProps) => {
      if (item.price && item.quantity && item.tva && isTvaIncluded) {
        totalTva += item.tva
          ? (item.price * item.quantity * item.tva) / 100
          : 0;
      }
    });
    return totalTva;
  }
  export function getTotalHtva(arr: [totalProps]) {
    let totalHtva = 0;
    arr.forEach((item: totalProps) => {
      if (item.price && item.quantity) {
        totalHtva += item.price * item.quantity;
      }
    });
    return totalHtva;
  }
  export function getTotal(arr: [totalProps], isTvaIncluded: boolean) {
    let total = 0;
    arr.forEach((item: totalProps) => {
      if (item.price && item.quantity) {
        total +=
          item.tva && isTvaIncluded
            ? (item.price * item.quantity * item.tva) / 100 +
              item.price * item.quantity
            : item.price * item.quantity;
      }
    });
    return total;
  }


