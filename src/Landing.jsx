import  Hero from './pages/landing/Hero'
import About from './pages/landing/About';
import './styles/main.css';

import Testimonial from './pages/landing/Testimonial';
import LandingInventory from './pages/landing/LandingInventory';



function App() {
  return (
    <div className="App">
      
      <main>
        {/* <Hero></Hero> */}
        <About></About>
   
        <Testimonial></Testimonial>
      </main>
    </div>
  );
}

export default App;
