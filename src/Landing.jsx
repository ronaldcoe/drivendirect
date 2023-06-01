import  Hero from './pages/landing/Hero'
import About from './pages/landing/About';
import './styles/main.css';
import Card from './pages/display-car/Card';



function App() {
  return (
    <div className="App">
      
      <main>
        <Hero></Hero>
        <About></About>
        <Card></Card>
      </main>
    </div>
  );
}

export default App;
