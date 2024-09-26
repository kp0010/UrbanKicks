import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Navbar } from './Components/Navbar/Navbar';
import { LoginPage } from './Pages/Login';
import { Homepage } from './Pages/Homepage';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <RoutesList />
      </Router>
    </div>
  );
}

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/men" element={<ShopCategory category="men" />} />
      <Route path="/women" element={<ShopCategory category="women" />} />
      <Route path="/kids" element={<ShopCategory category="kids" />} />
      <Route path="/product" element={<Product />}>
        <Route path=':productId' element={<Product />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default App;
