import React, { createContext } from "react";
import men_sandals from "../Components/Assets/ProductData/mensandals.js"
import new_arrivals from "../Components/Assets/ProductData/new_arrivals.js";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const contextValue = {
        men_sandals: men_sandals,
        new_arrivals: new_arrivals
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;