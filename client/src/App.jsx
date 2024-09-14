import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Navbar } from './Components/Navbar/Navbar';
import { LoginPage } from './Pages/Login';
import { Homepage } from './Pages/Homepage';
import { Mens } from './Pages/Mens'
import { Womens } from './Pages/Womens'
import { Kids } from './Pages/Kids'

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
      <Route exact path="/" element={<Homepage />} />
      <Route path="/nav" element={<Navbar />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mens" element={<Mens />} />
      <Route path="/womens" element={<Womens />} />
      <Route path="/kids" element={<Kids />} />
    </Routes>
  )
}

export default App;
