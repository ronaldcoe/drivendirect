
import Header from './pages/landing/Header';
import './styles/main.css';
import Terms from './pages/terms/Privacy.jsx'
import Landing from './Landing'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './pages/landing/Footer';
import Login from './pages/login-signup/Login';
import Signup from './pages/login-signup/Signup';
import Firebase from './Firebase2';
import AddVehicle from './pages/add_vehicle/AddVehicle';
import CardGrid from './shared/CarInformation/CardGrid';
import Dashboard from './pages/dashboard/Dashboard';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>    
        {/* <Firebase/>    */}
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/privacy-policy" element={<Terms />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/trade' element={<AddVehicle type={"trade"}/>}/>
            <Route path='/search' element={<AddVehicle type={"search"} />}/>
            <Route path='/inventory' element={<CardGrid/>}/>
          </Routes>
        </Router>
        {/* <AddVehicle/> */}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
