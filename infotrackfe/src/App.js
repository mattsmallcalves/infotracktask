import logo from './logo.svg';
import './App.css';
import Navbar from "./component/Navbar/SimpleNavBar.js";
import SearchForm from "./view/Search.js";
function App() {
  return (
    
    <div className="App">
      <Navbar/>
      <header className="App-header">
        
        <SearchForm/>
      </header>
    </div>
  );
}

export default App;
