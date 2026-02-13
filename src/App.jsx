import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer.jsx';
import Checkout from "./screens/Checkout.jsx";
import Home from './screens/Home.jsx';
import Login from './screens/Login.jsx';
import Signup from './screens/Signup.jsx';
import ChefDashboard from './screens/ChefDashboard.jsx';
import Cart from './screens/Cart.jsx';
import MyOrder from './screens/MyOrder.jsx';
import Menu from './screens/Menu.jsx';
import About from './screens/About.jsx';
import Contact from './screens/Contact.jsx';
import FAQ from './screens/FAQ.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/chef-dashboard" element={<ChefDashboard />} />
          <Route path="/checkout" element={<Checkout />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
