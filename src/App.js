import './App.css';

import{
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom";
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import Login from './screens/Login'
import Photo from './screens/Photo';


function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/cam' element={<Photo/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
