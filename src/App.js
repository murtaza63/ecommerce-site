
import './App.css';
import React from 'react'
import Navbar from './components/container/Navbar/Navbar';
import Home from   './components/container/Home/Home';



function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Navbar/>
       <Home/>
      </header>
    </div>
  );
}

export default App;
