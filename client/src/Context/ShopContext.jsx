import React, { createContext } from "react";
import new_arrivals from "../Components/Assets/ProductData/new_arrivals.js"

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const contextValue = {new_arrivals};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;