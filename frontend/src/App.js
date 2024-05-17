import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AppRoutes from "./AppRoutes";
import './App.css';
import Footer from "./Components/Footer/Footer";

function App() {
  

  

  return (
    <Router>
      <div className="App">
        <Header/>
        <AppRoutes />
        <ToastContainer />
        <Footer/>
      </div>
    </Router>
  );
}

export default App;