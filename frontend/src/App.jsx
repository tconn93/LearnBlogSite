import { Outlet, Link } from "react-router-dom";
import './App.css'

function App() {
  return (
    <div className="App">
         <header className="App-header">
        <h1>Learn Software Development with Tyler</h1>
     
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/about">About</Link>
          </li> */}
        </ul>
      </nav>
      <hr />
       </header>
      <Outlet />
    </div>
  );
}

export default App;