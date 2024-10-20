import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Navbar } from './Components/Navbar/Navbar';
import { LoginPage } from './Pages/Login';
import { SignupPage } from './Pages/Signup'
import { Homepage } from './Pages/Homepage';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { Checkout } from './Pages/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NewArrivalsPage } from './Pages/NewArrivalsPage';
import { BestSellersPage } from './Pages/BestSellersPage';
import { Wishlist } from './Pages/Wishlist';
import { Footer } from './Components/Footer/Footer';
import { Delivery } from './Pages/Delivery';
import { PreviousOrdersPage } from './Pages/PreviousOrdersPage';

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Navbar />
        <RoutesList />
        <Footer />
      </Router>
    </div>
  );
}

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/men" element={<ShopCategory category="men" />} />
      <Route path="/women" element={<ShopCategory category="women" />} />
      <Route path="/kids" element={<ShopCategory category="kids" />} />
      <Route path="/newarrivals" element={<NewArrivalsPage />} />
      <Route path="/bestsellers" element={<BestSellersPage />} />
      <Route path="/product" element={<Product />}>
        <Route path=':productId' element={<Product />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/previousOrders" element={<PreviousOrdersPage />} />
    </Routes>
  )
}

export default App;
