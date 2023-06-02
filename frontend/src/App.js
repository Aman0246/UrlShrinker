import Home from './Pages/Home';
import './App.css';
//===========================================
import axios from "axios"
axios.defaults.baseURL="http://127.0.0.1:7000"
axios.defaults.withCredentials=true;


function App() {
  return (
    <div className="App">
<Home></Home>
    </div>
  );
}

export default App;
