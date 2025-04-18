
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
 export function getTotalTva(arr: totalProps[], isTvaIncluded: boolean) {
    const totalTva = arr.reduce((prev,curr)=>{
      return prev += curr.tva && isTvaIncluded
        ? (curr.price * curr.quantity * curr.tva) / 100
        : 0;
    },0)
    return totalTva;
  }
  export function getTotalHtva(arr: totalProps[]) {
    const totalHtva = arr.reduce((prev,curr)=>{
      return prev += curr.price * curr.quantity || 0;
    },0)
    return totalHtva;
  }
  export function getTotal(arr: totalProps[], isTvaIncluded: boolean) {
    const total = arr.reduce((prev,curr) =>{
      return prev += curr?.total || 0;
    },0)
    return total;
  }


