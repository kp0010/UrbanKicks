import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

import all_products from "../Components/Assets/ProductData/allproducts.js"
import new_arrivals from "../Components/Assets/ProductData/new_arrivals.js";

import { useAuth } from "./AuthContext"

const ShopContext = createContext({
    all_products: [],
    new_arrivals: [],
    cartData: [],
    cartCount: 0,
    updateCart: () => { },
    deleteCart: () => { },
    addToCart: () => { },
    price: 0
});

export const useShop = () => useContext(ShopContext)

const ShopContextProvider = ({ children }) => {

    const [cartData, setCartData] = useState([])
    const [cartCount, setCartCount] = useState(0);
    const [cartChanged, setCartChanged] = useState(false)
    const [price, setPrice] = useState(false)

    const { auth, user } = useAuth()

    const getCart = () => {
        if (!auth) {
            setCartData([])
            setCartCount(0)
            return
        }
        fetch("http://localhost:8080/getCart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mail: user.mail,
            }),
            credentials: "include"
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    setCartData(data.result)
                    setCartCount(data.length)
                    setCartChanged(false)
                }
            })
    }

    const addToCart = (productid, size, quantity) => {
        if (!auth) { return }

        fetch("http://localhost:8080/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: productid,
                mail: user.mail,
                quantity,
                size
            }),
            credentials: "include"
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    setCartChanged(true)
                }
            })
    }

    const updateCart = (productid, size, quantity) => {
        if (!(quantity <= 5 & quantity >= 1)) { return }
        if (!auth) { return }

        updatePrice(productid, size, quantity)

        fetch("http://localhost:8080/cart", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: productid,
                mail: user.mail,
                size: size,
                quantity: quantity
            }),
            credentials: "include"
        })
            .then(setCartChanged(true))
    }

    const deleteCart = (productid, size) => {
        if (!auth) { return }

        updatePrice(productid, size, 0)

        fetch("http://localhost:8080/cart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: productid,
                mail: user.mail,
                size: size,
            }),
            credentials: "include"
        })
        setCartChanged(true)
    }

    const getPrice = () => {
        let cartItem = null;
        let acc = 0

        for (cartItem of cartData) {
            const product = all_products.find((product) => product.id === cartItem.productid);
            acc = acc + (product.price * cartItem.quantity)
        }

        setPrice(acc)
    }

    const updatePrice = (productid, size, quantity) => {
        let cartItem = null;
        let acc = 0

        for (cartItem of cartData) {
            const product = all_products.find((product) => product.id === cartItem.productid);
            if (productid === cartItem.productid & size === cartItem.size) {
                if (quantity !== undefined)
                    acc = acc + (product.price * quantity)
            }
            else {
                acc = acc + (product.price * cartItem.quantity)
            }
        }
        setPrice(acc)
    }

    useEffect(() => { getCart() }, [cartChanged, auth, user])
    useEffect(() => { getPrice() }, [cartData])

    const contextValue = {
        all_products,
        new_arrivals,
        cartData,
        cartCount,
        addToCart,
        updateCart,
        deleteCart,
        price
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
