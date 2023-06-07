import Home from './Pages/Home';
import './App.css';
//===========================================
import axios from "axios"
axios.defaults.baseURL="https://urlshortner-aman.onrender.com"
axios.defaults.withCredentials=true;


function App() {
  return (
    <div className="App">
<Home></Home>
    </div>
  );
}

export default App;
