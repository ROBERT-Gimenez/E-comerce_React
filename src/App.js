import Home from "./components/Home/Home";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Footer from "./components/Footer";
import {Routes , Route} from 'react-router-dom'
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";
import Admin from "./components/Admin/Admin";
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/Profile" element={<Profile/>}></Route>
      <Route path="/ShoppingCart" element={<Cart/>}></Route>
      <Route path="/Admin-Profile" element={<Admin/>}></Route>
      

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
