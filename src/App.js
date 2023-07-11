
import Header from './pages/landing/Header';
import './styles/main.css';
import Terms from './pages/terms/Privacy.jsx'
import Faq from './pages/terms/Faq.jsx'
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
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>    
        {/* <Firebase/>    */}
      </header>
      <main>
        <ReactNotifications className='notifications' />
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/privacy-policy" element={<Terms />} />
            <Route path="/faq" element={<Faq />} />
            <Route path='./login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/inventory/trade' element={<CardGrid type={"trade"}/>}/>
            <Route path='/inventory/listing' element={<CardGrid type={"listing"}/>}/>
            
            {/* ALL PROTECTED ROUTES THAT NEED SIGNIN USER */}
            <Route exact path='/dashboard' element={
              <ProtectedRoute>
                <Dashboard title="Dashboard"/>
              </ProtectedRoute>
            } />
            <Route exact path='/trade' element={
              <ProtectedRoute>
                <AddVehicle type={"trade"}/>
              </ProtectedRoute>
            } />
            <Route exact path='/search' element={
              <ProtectedRoute>
                <AddVehicle type={"listing"} />
              </ProtectedRoute>
            } />
           
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
