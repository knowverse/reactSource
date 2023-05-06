import logo from './logo.svg';
import './App.css';

import {useState} from "react";
import {Home} from "./components/Home";
import {Login} from "./components/Login";
function App() {
  const [login,setLogin]=useState("");

  console.log(login)
  return (
    <>
    {
      login ?
            <Home log={login}/>
      :
            <Login data={setLogin}/>
    }
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
