
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
import ProtectedRoute from './shared/ProtectedRoute';


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
            <Route exact path='/dashboard' element={
              <ProtectedRoute>
                <Dashboard title="Dashboard"/>
              </ProtectedRoute>
            } />
            {/* <Route path='/dashboard' element={<Dashboard title="Dashboard"/>}/> */}
            <Route path='/trade' element={<AddVehicle type={"trade"}/>}/>
            <Route path='/search' element={<AddVehicle type={"listing"} />}/>
            <Route path='/inventory/trade' element={<CardGrid type={"trade"}/>}/>
            <Route path='/inventory/listing' element={<CardGrid type={"listing"}/>}/>
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
