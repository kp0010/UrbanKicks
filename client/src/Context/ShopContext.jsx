import React, { createContext, useState } from "react";

import all_products from "../Components/Assets/ProductData/allproducts.js"
import new_arrivals from "../Components/Assets/ProductData/new_arrivals.js";

export const ShopContext = createContext(null);

{/*const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_products.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}*/}

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const contextValue = { all_products, new_arrivals, getCartCount };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
