import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

import new_arrivals from "../Components/Assets/ProductData/new_arrivals.js";
import best_sellers from "../Components/Assets/ProductData/bestsellers.js"

import { useAuth } from "./AuthContext"

const ShopContext = createContext({
    all_products: [],
    new_arrivals: [],
    best_sellers: [],
    cartData: [],
    cartCount: 0,
    updateCart: () => { },
    deleteCart: () => { },
    addToCart: () => { },
    refreshCart: () => { },
    price: 0,
    loading: true
});

export const useShop = () => useContext(ShopContext)

const ShopContextProvider = ({ children }) => {

    const [cartData, setCartData] = useState([])
    const [cartCount, setCartCount] = useState(0);
    const [cartChanged, setCartChanged] = useState(false)
    const [price, setPrice] = useState(0)
    const [all_products, setAllProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { auth, user } = useAuth()

    const getAllProducts = () => {
        setLoading(true)
        fetch("http://localhost:8080/products", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(resp => resp.json())
            .then(data => {
                const sizes = data.sizes
                const products = data.products
                // console.log(sizes[0], products[0])

                if (sizes !== undefined) {
                    const combinedData = products.map((product) => {
                        return {
                            ...product,
                            sizes: sizes.filter((size) => size.sizeid === product.sizeid).map(size => size.sizenumber)
                        }
                    })
                    setAllProducts(combinedData)
                    setLoading(false)
                }
                // console.log(combinedData[0].productid, combinedData[0].sizes)
            })
    }

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
            const product = all_products.find((product) => product.productid === cartItem.productid);
            if (!product) { return }
            acc = acc + (product.price * cartItem.quantity)
        }

        setPrice(acc)
    }

    const updatePrice = (productid, size, quantity) => {
        let cartItem = null;
        let acc = 0

        for (cartItem of cartData) {
            const product = all_products.find((product) => product.productid === cartItem.productid);
            if (!product) { return }
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

    const refreshCart = () => {
        setCartChanged(true)
    }

    useEffect(() => { getCart() }, [cartChanged, auth, user])
    useEffect(() => { getPrice() }, [cartData, all_products, loading])
    useEffect(() => { getAllProducts() }, [])

    const contextValue = {
        all_products,
        new_arrivals,
        best_sellers,
        cartData,
        cartCount,
        addToCart,
        updateCart,
        deleteCart,
        refreshCart,
        price,
        loading
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
