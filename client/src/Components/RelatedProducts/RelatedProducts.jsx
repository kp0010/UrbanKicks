import React, { useEffect, useState } from 'react'
import "./RelatedProducts.css"
import { useShop } from '../../Context/ShopContext'
import { Item } from '../Item/Item'

export const RelatedProducts = ({ category, subCategory }) => {
    const { all_products } = useShop();
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (all_products.length > 0) {
            let productsCopy = all_products.slice();
            productsCopy = productsCopy.filter((item) => category === item.gender && subCategory === item.category)
            productsCopy = productsCopy.sort(() => Math.random() - 0.5);
            setRelated(productsCopy.slice(0, 4));
        }
    }, [all_products, category, subCategory])

    return (
        <div className="relatedProducts">
            <hr />
            <div className="relatedProducts-text">
                <h5>You may also like</h5>
            </div>
            <div className="relatedProducts-item">
                {related.map((item, index) => {
                    return <Item key={index} id={item.productid} name={item.title} subtitle={item.subtitle} image={item.image} new_price={item.price} />
                })}
            </div>
            <hr />
        </div>
    )
}
