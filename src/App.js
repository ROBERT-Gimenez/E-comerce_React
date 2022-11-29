import Home from "./components/Home/Home";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
