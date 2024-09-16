import React, { createContext } from "react";
import men_sandals from "../Components/Assets/ProductData/mensandals.js"

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const contextValue = {men_sandals};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;