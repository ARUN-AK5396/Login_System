import SignUpScreen from './SignUp/SignUpScreen';
import LoginScreen from './Login/LoginScreen';
import HomeScreen from './Home/HomeScreen';
import './App.css';

import {BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUpScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/home' element={<HomeScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
