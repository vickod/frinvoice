
type totalProps = {
    price: number;
    quantity: number;
    tva?: number;
    isTvaIncluded?: boolean
}

export function getTotal({price, quantity, tva, isTvaIncluded}: totalProps) {
    if(price && quantity) {
        return tva && isTvaIncluded ? ((price * quantity)*tva)/100 + (price * quantity) : price * quantity
    }
    return 0
}

export function getTva({price, quantity, tva, isTvaIncluded}: totalProps) {
    if(price && quantity && tva && isTvaIncluded) {
        return tva ? ((price * quantity)*tva)/100 : 0
    }
    return 0
}

export function getTotalHtva({price, quantity}: totalProps) {
    if(price && quantity) {
        return price * quantity
    }
    return 0
}




  // const calculateTotal =
  //   isTvaIncluded && Number(tva) > 0
  //     ? ((Number(quantity) || 0) * (Number(price) || 0) * Number(tva)) / 100 +
  //       (Number(quantity) || 0) * (Number(price) || 0)
  //     : (Number(quantity) || 0) * (Number(price) || 0);
  // const calculateTVA =
  //   ((Number(quantity) || 0) * (Number(price) || 0) * Number(tva)) / 100;
  // const calculateTotHtva = (Number(quantity) || 0) * (Number(price) || 0);