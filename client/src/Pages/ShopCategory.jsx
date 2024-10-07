import React, { useEffect, useState } from 'react'
import "./CSS/ShopCategory.css"
import { useShop } from '../Context/ShopContext';
import { CategoryItem } from '../Components/CategoryItem/CategoryItem';
import banner_1 from "../Components/Assets/HomeAssets/men_banner.png"
import banner_2 from "../Components/Assets/HomeAssets/women_banner.png"
import banner_3 from "../Components/Assets/HomeAssets/kids_banner.png"

import { useLocation } from 'react-router-dom';

export const ShopCategory = (props) => {
  const { all_products } = useShop();

  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const Banner = () => {
    const location = useLocation();

    let bannerImage;

    if (location.pathname === "/men") {
      bannerImage = <img src={banner_1} alt="Men's Banner" />;
    } else if (location.pathname === "/women") {
      bannerImage = <img src={banner_2} alt="Women's Banner" />;
    } else if (location.pathname === "/kids") {
      bannerImage = <img src={banner_3} alt="Kids' Banner" />;
    }
    return <div> {bannerImage}</div>;
  }

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilters = () => {
    let productsCopy = all_products.slice();
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'Low-High':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'High-Low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilters();
        break;
    }
  }

  useEffect(() => {

    applyFilters();
  }, [category,]);

  useEffect(() => {
    sortProduct();
  }, [sortType,])


  return (
    <div className="shop-category">
      <div className="shop-category-banner">
        <Banner />
      </div>
      <div className="shop-category-sort">
        <div> HOME / ALL PRODUCTS / {props.category}</div>
        <select onChange={(e) => setSortType(e.target.value)} className="shop-category-sort-type" >
          <option value="relevant">Sort by: Relevant</option>
          <option value="Low-High">Sort by: Low to High</option>
          <option value="High-Low">Sort by: High to Low</option>
        </select>
      </div>
      <div className="shop-category-main">
        <div className="shop-category-filters">
          <p className="shop-category-filters-font">FILTERS</p>
          <div className="shop-category-subcategory">
            <p>TYPE</p>
            <div className="shop-category-subcategory-type">
              <p>
                <input type="checkbox" value="jordan" onChange={toggleCategory} />Jordans
              </p>
              <p>
                <input type="checkbox" value="lifestyle" onChange={toggleCategory} />Lifestyle
              </p>
              <p>
                <input type="checkbox" value="running" onChange={toggleCategory} />Running
              </p>
              <p>
                <input type="checkbox" value="sneaker" onChange={toggleCategory} />Sneakers
              </p>
              <p>
                <input type="checkbox" value="sandals and slides" onChange={toggleCategory} />Sandals And Slides
              </p>
              <p>
                <input type="checkbox" value="slipper" onChange={toggleCategory} />Slipper
              </p>
            </div>
          </div>
        </div>
        <div className="shop-category-products">
          {filterProducts.map((item, i) => {
            if (props.category === item.gender) {
              return <CategoryItem key={i} id={item.id} name={item.title} subtitle={item.subtitle} image={item.img} new_price={item.price} />
            }
            else {
              return null;
            }
          })}
        </div>
      </div>

    </div>
  )
}
