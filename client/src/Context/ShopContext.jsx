import React, { createContext, useState } from "react";
import {toast} from "react-toastify";
import men_sandals from "../Components/Assets/ProductData/mensandals.js"
import new_arrivals from "../Components/Assets/ProductData/new_arrivals.js";

export const ShopContext = createContext(null);

{/*const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < men_sandals.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}*/}

const ShopContextProvider = (props) => {

    /*const [cartItems,setCartItems] = useState(getDefaultCart());*/
    const [cartItems, setCartItems] = useState({});

    {/*const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }*/}

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return
        }
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size]+=1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        setCartItems(cartData);
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

    }

    const removefromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const contextValue = {men_sandals,new_arrivals,cartItems,addToCart,updateQuantity,removefromCart};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;