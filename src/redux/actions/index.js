export const increment = (number) => {
    return {
        type: "INCREMENT",
        payload: number
    }
}

export const decrement = (number) => {
    return {
        type: "DECREMENT",
        payload: number
    }
}

// export const addToCart = (price) => {
//     return {
//         type: "ADDTOCART",
//         payload: price
//     }
// }

export const addToCart = (value) => {
    return {
        type: "ADDTOCART",
        payload: value
    }
}

export const addMore = (data) => {
    return {
        type: "ADDMORE",
        payload: data, 
        qty: 1
    }
}

// export const minus = (qty) => {
//     return {
//         type: "MINUS",
//         payload: qty
//     }
// }
