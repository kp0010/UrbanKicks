import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from './Components/Navbar/Navbar';
import { Home } from './Components/HomePage/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/nav" element={<Navbar />} />
        </Routes>
        <h1>REST OF THE FUCKING SITE</h1>
      </Router>
    </div>
  );
}

export default App;
