import  Hero from './pages/landing/Hero'
import About from './pages/landing/About';
import './styles/main.css';

import Testimonial from './pages/landing/Testimonial';
import LandingInventory from './pages/landing/LandingInventory';



function App() {
  document.title = "Home - DealerTrade"
  return (
    <div className="App">
      
      <main>
        <Hero></Hero>
        <About></About>
      </main>
    </div>
  );
}

export default App;
