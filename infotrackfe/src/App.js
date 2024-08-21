import logo from './logo.svg';
import './App.css';
import Navbar from "./component/Navbar/SimpleNavBar.js";
import SearchFrom from "./view/Search.js";
function App() {
  return (
    
    <div className="App">
      <Navbar/>
      <header className="App-header">
        
        <SearchFrom/>
      </header>
    </div>
  );
}

export default App;
