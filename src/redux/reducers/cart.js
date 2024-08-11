const cartValues = {
    totalPrice : 0,
    totalQty : 0,
    product : [],
    // singleQty: 0
}

export const addCart = (state = cartValues, action) => {
    switch(action.type){
        case "ADDTOCART":
            return {
                // totalPrice: state.totalPrice + action.payload,
                totalPrice: state.totalPrice + action.payload.price,
                totalQty: state.totalQty + 1,
                product: state.product.concat(
                    // quantity: 1,
                    action.payload)          
            }

        case "ADDMORE":
            return {
                // totalPrice: state.totalPrice + action.payload,
                singleQty: state.singleQty + action.qty,
                totalPrice: state.totalPrice * 2,
                totalQty: state.totalQty + 1,
                product: state.product.concat({
                    quantity: state.singleQty,
                    productData: action.payload})          
            }

        // case "MINUS":
        //     return {
        //         // totalPrice: state.totalPrice + action.payload,
        //         totalPrice: state.totalPrice + action.payload.price,
        //         totalQty: state.totalQty + 1,
        //         product: state.product.concat({
        //             quantity: state.payload,
        //             productData: action.payload})          
        //     }

        default:
            return state;
    }
}