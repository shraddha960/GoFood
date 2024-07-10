import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importing Bootstrap JS
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrders from './screens/MyOrders';

function App() {
  return (

    <CartProvider>
         <Router>
            <div>
              <Routes>
                <Route exact path='/' element={ <Home/>}/>
                <Route exact path='/login' element={ <Login/>}/>
                <Route exact path='/createuser' element={ <Signup/>}/>
                <Route exact path='/myorder' element={ <MyOrders/>}/>
              </Routes>
            </div>
          </Router>
    </CartProvider>
  );
}

export default App;
