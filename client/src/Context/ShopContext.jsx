import React, { createContext, useState } from "react";
import men_sandals from "../Components/Assets/ProductData/mensandals.js"
import new_arrivals from "../Components/Assets/ProductData/new_arrivals.js";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < men_sandals.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems,setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }
    const removefromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const contextValue = {men_sandals,new_arrivals,cartItems,addToCart,removefromCart};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;