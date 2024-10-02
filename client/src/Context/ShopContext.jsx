import React, { createContext, useState } from "react";
import {toast} from "react-toastify";
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
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        console.log(cartItems);
        setCartItems(cartData);
    }

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

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

    }

    const removefromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const contextValue = { all_products, new_arrivals, cartItems, addToCart, getCartCount, updateQuantity, removefromCart };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;